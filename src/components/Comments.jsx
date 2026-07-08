import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Heart, Send, Check, AlertCircle, Sparkles, Trash2, Lock, Unlock } from "lucide-react";
import DecryptedText from "./DecryptedText";

const API_BASE_URL = "http://localhost:5000/api";

const FEEDBACK_TYPES = [
  { label: "Kudos ❤️", value: "Kudos" },
  { label: "Idea 💡", value: "Idea" },
  { label: "Question ❓", value: "Question" },
  { label: "Suggestion 🚀", value: "Suggestion" },
];

const APPRECIATION_BADGES = [
  "👏 Clap",
  "🔥 Fire",
  "🚀 Rocket",
  "❤️ Heart",
  "👑 Crown",
];

function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return past.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [pendingComments, setPendingComments] = useState([]);
  const [myCommentIds, setMyCommentIds] = useState([]);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [type, setType] = useState("Kudos");
  const [badge, setBadge] = useState("❤️ Heart");
  const [commentText, setCommentText] = useState("");
  
  // UI Status
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [replyTargetId, setReplyTargetId] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Load reviews and user's comment IDs & verify admin token
  useEffect(() => {
    // 1. Fetch Approved Reviews
    fetchReviews();

    // 2. Load my comment IDs
    const storedMyIds = localStorage.getItem("my_comment_ids");
    if (storedMyIds) {
      try {
        setMyCommentIds(JSON.parse(storedMyIds));
      } catch (e) {
        setMyCommentIds([]);
      }
    }

    // 3. Verify Admin Token if present
    const token = localStorage.getItem("portfolio_admin_token");
    if (token) {
      verifyAdminToken(token);
    }
  }, []);

  // Fetch pending comments when admin state changes to true
  useEffect(() => {
    if (isAdmin) {
      fetchPendingReviews();
    } else {
      setPendingComments([]);
    }
  }, [isAdmin]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Error loading reviews from database:", err);
    }
  };

  const fetchPendingReviews = async () => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/reviews/admin/pending`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPendingComments(data);
      }
    } catch (err) {
      console.error("Error loading pending reviews:", err);
    }
  };

  const verifyAdminToken = async (token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/verify`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setIsAdmin(true);
      } else {
        localStorage.removeItem("portfolio_admin_token");
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Token verification failed:", err);
      setIsAdmin(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError("");
    setAdminLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("portfolio_admin_token", data.token);
        setIsAdmin(true);
        setShowAdminLogin(false);
        setAdminPassword("");
      } else {
        setAdminError(data.message || "Invalid password.");
      }
    } catch (err) {
      setAdminError("Unable to connect to login API.");
    } finally {
      setAdminLoading(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("portfolio_admin_token");
    setIsAdmin(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please specify your name.");
      return;
    }
    if (!commentText.trim()) {
      setError("Please write a comment message.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim() || null,
      rating,
      comment: commentText.trim(),
      type,
      badge
    };

    // Optimistic UI updates setup
    const tempId = `temp-${Date.now()}`;
    const optimisticComment = {
      ...payload,
      id: tempId,
      date: new Date().toISOString(),
      likes: 0,
      userLiked: false,
      replies: [],
      isPending: true // Shows visual cue to author
    };

    // 1. Optimistically append comment
    setComments((prev) => [optimisticComment, ...prev]);
    setIsSuccess(true);
    setIsSubmitting(false);

    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        // Track comment ownership
        setMyCommentIds((prevIds) => {
          const updated = [...prevIds, data.id];
          localStorage.setItem("my_comment_ids", JSON.stringify(updated));
          return updated;
        });

        // 2. Replace optimistic temp review with database response
        setComments((prev) => 
          prev.map((c) => (c.id === tempId ? data : c))
        );

        // Reset form fields
        setName("");
        setEmail("");
        setRating(5);
        setType("Kudos");
        setBadge("❤️ Heart");
        setCommentText("");
      } else {
        // Revert optimistic insert on API failure
        setComments((prev) => prev.filter((c) => c.id !== tempId));
        setError(data.message || "Failed to submit comment.");
        setIsSuccess(false);
      }
    } catch (err) {
      setComments((prev) => prev.filter((c) => c.id !== tempId));
      setError("Connection to Review API failed.");
      setIsSuccess(false);
    }
  };

  const handleLike = async (id) => {
    // 1. Optimistic Like update
    let previousState = [];
    setComments((prev) => {
      previousState = prev;
      return prev.map((c) => {
        if (c.id === id) {
          const userLiked = !c.userLiked;
          return {
            ...c,
            userLiked,
            likes: userLiked ? c.likes + 1 : Math.max(0, c.likes - 1)
          };
        }
        return c;
      });
    });

    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}/like`, { method: "POST" });
      if (!res.ok) {
        // Revert on API error
        setComments(previousState);
      }
    } catch (err) {
      setComments(previousState);
    }
  };

  const handleApproveReview = async (id) => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}/approve`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        // Remove from pending control panel
        setPendingComments((prev) => prev.filter((c) => c.id !== id));
        // Refresh approved reviews feed
        fetchReviews();
      }
    } catch (err) {
      console.error("Error approving review:", err);
    }
  };

  const handleDeleteReview = async (id) => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        // Filter out of both approved and pending sets
        setComments((prev) => prev.filter((c) => c.id !== id));
        setPendingComments((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const handleUserDeleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;

    let previousState = [];
    setComments((prev) => {
      previousState = prev;
      return prev.filter((c) => c.id !== id);
    });

    try {
      const res = await fetch(`${API_BASE_URL}/reviews/user/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setMyCommentIds((prevIds) => {
          const updated = prevIds.filter((myId) => myId !== id);
          localStorage.setItem("my_comment_ids", JSON.stringify(updated));
          return updated;
        });
      } else {
        setComments(previousState);
      }
    } catch (err) {
      setComments(previousState);
    }
  };

  const handleAdminReply = async (id) => {
    if (!replyText.trim()) return;
    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ comment: replyText.trim() })
      });
      const data = await res.json();

      if (res.ok) {
        // Inject reply into the local comments array
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === id) {
              return {
                ...c,
                replies: [...(c.replies || []), data]
              };
            }
            return c;
          })
        );
        setReplyTargetId(null);
        setReplyText("");
      }
    } catch (err) {
      console.error("Error sending admin reply:", err);
    }
  };

  return (
    <section id="comments" className="max-w-6xl mx-auto px-6 py-24 border-t border-hairline/30">
      {/* Section Header */}
      <p className="font-mono text-xs uppercase tracking-widest text-live mb-3">
        <DecryptedText text="[ Feedback & Appreciation ]" animateOn="view" sequential={true} speed={80} />
      </p>
      <h2 className="font-display text-3xl font-semibold mb-2">Guestbook &amp; Feedback</h2>
      <p className="text-text-muted mb-12 max-w-lg">
        Leave a note to share your thoughts, suggest ideas for my projects, or send appreciation!
      </p>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Form / Admin Panel Column */}
        <div className="lg:col-span-5 bg-surface border border-hairline rounded-2xl p-6 relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            
            {/* 1. ADMIN WORKSPACE */}
            {isAdmin ? (
              <motion.div
                key="admin-workspace"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 relative z-10"
              >
                <div className="flex items-center justify-between border-b border-hairline pb-4">
                  <h3 className="font-display font-semibold text-lg text-live flex items-center gap-2">
                    <Unlock className="w-5 h-5 text-live" />
                    Admin Moderation
                  </h3>
                  <button
                    onClick={handleAdminLogout}
                    className="text-[10px] font-mono uppercase bg-surface-raised border border-hairline hover:border-destructive/40 text-text-muted hover:text-destructive px-3 py-1.5 rounded-xl cursor-pointer"
                  >
                    Logout
                  </button>
                </div>

                {/* Moderation List */}
                <div className="space-y-4">
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    Pending Reviews ({pendingComments.length})
                  </h4>
                  {pendingComments.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-hairline rounded-xl text-text-muted text-xs">
                      No pending reviews to moderate.
                    </div>
                  ) : (
                    <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1">
                      {pendingComments.map((c) => (
                        <div key={c.id} className="bg-surface-raised border border-hairline p-3 rounded-xl space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-text-primary text-xs">{c.name}</div>
                              <div className="text-[10px] text-text-muted">{timeAgo(c.date)}</div>
                            </div>
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-violet/10 text-violet">
                              {c.type}
                            </span>
                          </div>
                          <p className="text-xs text-text-muted line-clamp-3">"{c.comment}"</p>
                          
                          <div className="flex gap-2 pt-1.5 border-t border-hairline/40">
                            <button
                              onClick={() => handleApproveReview(c.id)}
                              className="flex-1 bg-live/15 hover:bg-live/25 text-live border border-live/30 text-[10px] font-mono uppercase py-1.5 rounded-lg cursor-pointer transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDeleteReview(c.id)}
                              className="bg-destructive/15 hover:bg-destructive/25 text-destructive border border-destructive/30 text-[10px] font-mono uppercase px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : 
            
            // 2. ADMIN LOGIN FORM
            showAdminLogin ? (
              <motion.form
                key="admin-login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleAdminLogin}
                className="space-y-5 relative z-10"
              >
                <h3 className="font-display font-semibold text-lg text-text-primary flex items-center gap-2">
                  <Lock className="w-5 h-5 text-violet" />
                  Admin Authentication
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="admin-pass" className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    Enter Admin Password
                  </label>
                  <input
                    id="admin-pass"
                    type="password"
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-surface-raised border border-hairline focus:border-violet focus:ring-1 focus:ring-violet outline-none rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-muted/65 transition-all duration-300 text-sm"
                    required
                    autoFocus
                  />
                </div>

                {adminError && (
                  <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{adminError}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminLogin(false);
                      setAdminPassword("");
                      setAdminError("");
                    }}
                    className="flex-1 bg-surface-raised border border-hairline text-text-primary font-mono text-xs py-3 rounded-xl cursor-pointer hover:border-hairline/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={adminLoading}
                    className="flex-1 bg-violet text-void font-mono font-semibold uppercase tracking-wider text-xs py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-violet/90 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {adminLoading ? "Verifying..." : "Unlock"}
                  </button>
                </div>
              </motion.form>
            ) :
            
            // 3. REGULAR COMMENT SUBMISSION FORM
            !isSuccess ? (
              <motion.form
                key="comment-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-5 relative z-10"
              >
                <h3 className="font-display font-semibold text-lg text-text-primary flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-violet" />
                  Leave your feedback
                </h3>

                {/* Name & Email Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="comment-name" className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      Your Name *
                    </label>
                    <input
                      id="comment-name"
                      type="text"
                      placeholder="e.g. Sarah Connor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-surface-raised border border-hairline focus:border-violet focus:ring-1 focus:ring-violet outline-none rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-muted/65 transition-all duration-300 text-sm"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="comment-email" className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      Email (Private)
                    </label>
                    <input
                      id="comment-email"
                      type="email"
                      placeholder="e.g. sarah.c@tech.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-raised border border-hairline focus:border-violet focus:ring-1 focus:ring-violet outline-none rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-muted/65 transition-all duration-300 text-sm"
                    />
                  </div>
                </div>

                {/* Rating Selector */}
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                    Rating Rating
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl transition-transform duration-150 hover:scale-115 cursor-pointer outline-none focus:outline-none"
                      >
                        <svg
                          className={`w-6 h-6 ${
                            star <= (hoverRating || rating)
                              ? "text-live fill-live"
                              : "text-text-muted/20 fill-none"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                    ))}
                    <span className="font-mono text-xs text-text-muted ml-2">
                      ({rating} / 5 stars)
                    </span>
                  </div>
                </div>

                {/* Feedback Type Selector */}
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                    Feedback Type
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {FEEDBACK_TYPES.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setType(t.value)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all duration-200 cursor-pointer ${
                          type === t.value
                            ? "bg-violet/10 border-violet text-violet font-semibold shadow-inner shadow-violet/5"
                            : "bg-surface-raised border-hairline text-text-muted hover:border-hairline/80 hover:text-text-primary"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Appreciation Badge Selector */}
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
                    Appreciation Badge
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {APPRECIATION_BADGES.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBadge(b)}
                        className={`py-1.5 px-3 rounded-xl text-xs border transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                          badge === b
                            ? "bg-live/15 border-live text-live font-semibold shadow-inner shadow-live/5 ring-1 ring-live/20"
                            : "bg-surface-raised border-hairline text-text-muted hover:border-hairline/80 hover:text-text-primary"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment Text Area */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="comment-text" className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    Your Message *
                  </label>
                  <textarea
                    id="comment-text"
                    rows={4}
                    placeholder="Write your constructive feedback or nice comments here..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-surface-raised border border-hairline focus:border-violet focus:ring-1 focus:ring-violet outline-none rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted/65 transition-all duration-300 text-sm resize-none"
                    required
                  />
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-xl overflow-hidden"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-violet text-void font-mono font-semibold uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-violet/90 transition-all duration-300 hover:shadow-lg hover:shadow-violet/10 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Publish Comment
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 px-4 flex flex-col items-center text-center space-y-4 relative z-10"
              >
                <div className="w-16 h-16 bg-live/15 border border-live/30 text-live rounded-full flex items-center justify-center shadow-lg shadow-live/5 relative">
                  <Check className="w-8 h-8" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full border border-live/30"
                  />
                </div>

                <h3 className="font-display font-semibold text-xl text-text-primary">Submitted Successfully!</h3>
                <p className="text-text-muted text-sm max-w-xs">
                  Thank you! Your feedback has been sent for admin review and will be visible shortly.
                </p>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider bg-surface-raised border border-hairline px-4 py-2.5 rounded-xl text-text-primary hover:border-violet/40 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-live" />
                  Write Another Note
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side Approved Comments List Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-text-muted">
              Recent Activity ({comments.length})
            </span>
            <button
              onClick={() => {
                if (isAdmin) {
                  handleAdminLogout();
                } else {
                  setShowAdminLogin(!showAdminLogin);
                  setAdminError("");
                }
              }}
              className="font-mono text-[10px] uppercase tracking-wider text-violet hover:text-live transition-colors cursor-pointer flex items-center gap-1.5 bg-surface border border-hairline px-3 py-1.5 rounded-xl"
            >
              {isAdmin ? (
                <>
                  <Unlock className="w-3 h-3 text-live" /> Lock Panel
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" /> Admin Area
                </>
              )}
            </button>
          </div>

          <div className="max-h-[640px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-hairline">
            <AnimatePresence initial={false}>
              {comments.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16 border border-dashed border-hairline rounded-2xl"
                >
                  <MessageSquare className="w-8 h-8 mx-auto text-text-muted mb-2 opacity-55" />
                  <p className="text-text-muted text-sm">No comments yet. Be the first to leave one!</p>
                </motion.div>
              ) : (
                comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                    className="group border border-hairline bg-surface p-5 rounded-2xl transition-all duration-300 hover:border-violet/20 hover:bg-surface-raised relative overflow-hidden"
                  >
                    {/* Background glow in group hover */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-live/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="flex items-start justify-between gap-4 relative z-10">
                      {/* Left side info */}
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display font-semibold text-text-primary text-sm">
                            {comment.name}
                          </span>
                          <span className="font-mono text-[9px] text-text-muted">•</span>
                          <span className="font-mono text-[9px] text-text-muted">
                            {timeAgo(comment.date)}
                          </span>
                          {comment.isPending && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase bg-live/15 text-live border border-live/30 animate-pulse">
                              Pending moderation
                            </span>
                          )}
                        </div>

                        {/* Star Rating Render */}
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= comment.rating
                                  ? "text-live fill-live"
                                  : "text-text-muted/20 fill-none"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>

                        {/* Badges Row */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-violet/10 text-violet border border-violet/20">
                            {comment.type}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-live/10 text-live border border-live/20 flex items-center gap-0.5">
                            {comment.badge}
                          </span>
                        </div>
                      </div>

                      {/* Actions (Top Right) */}
                      <div className="flex items-center gap-2">
                        {(myCommentIds.includes(comment.id) || comment.name === localStorage.getItem("portfolio_last_author_name")) && (
                          <button
                            onClick={() => handleUserDeleteReview(comment.id)}
                            className="p-1.5 rounded-full border border-hairline hover:border-destructive/40 text-text-muted hover:text-destructive transition-all duration-200 cursor-pointer flex items-center justify-center bg-surface hover:bg-destructive/10"
                            title="Delete comment"
                            aria-label="Delete comment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleLike(comment.id)}
                          className={`flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
                            comment.userLiked
                              ? "bg-violet/10 border-violet/30 text-violet"
                              : "bg-surface border-hairline text-text-muted hover:border-hairline/80 hover:text-text-primary"
                          }`}
                        >
                          <Heart
                            className={`w-3 h-3 ${comment.userLiked ? "fill-violet stroke-violet" : "stroke-current"}`}
                          />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>

                    {/* Comment Body */}
                    <p className="mt-3 text-text-muted text-sm leading-relaxed whitespace-pre-wrap relative z-10">
                      {comment.comment}
                    </p>

                    {/* Nested Admin Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-live/30 space-y-3 relative z-10 bg-surface-raised/40 p-2.5 rounded-r-xl">
                        {comment.replies.map((reply) => (
                          <div key={reply.id || reply._id} className="text-xs space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-display font-semibold text-live">
                                {reply.adminName}
                              </span>
                              <span className="font-mono text-[8px] text-text-muted">•</span>
                              <span className="font-mono text-[8px] text-text-muted">
                                {timeAgo(reply.date)}
                              </span>
                            </div>
                            <p className="text-text-muted italic">
                              "{reply.comment}"
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Admin Actions (Delete & Inline Reply) */}
                    {isAdmin && (
                      <div className="mt-4 pt-3 border-t border-hairline/40 flex flex-col gap-2 relative z-10">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setReplyTargetId(replyTargetId === comment.id ? null : comment.id);
                              setReplyText("");
                            }}
                            className="text-[10px] font-mono text-violet hover:text-live flex items-center gap-1 cursor-pointer"
                          >
                            💬 {replyTargetId === comment.id ? "Cancel Reply" : "Reply as Admin"}
                          </button>
                          <span className="text-text-muted/40">•</span>
                          <button
                            onClick={() => handleDeleteReview(comment.id)}
                            className="text-[10px] font-mono text-destructive hover:brightness-110 flex items-center gap-1 cursor-pointer border border-transparent hover:border-destructive/30 px-1.5 py-0.5 rounded"
                          >
                            🗑️ Delete Review
                          </button>
                        </div>
                        
                        {replyTargetId === comment.id && (
                          <div className="flex gap-2 mt-2">
                            <input
                              type="text"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write admin reply..."
                              className="flex-1 bg-surface-raised border border-hairline focus:border-violet focus:ring-1 focus:ring-violet outline-none rounded-xl px-3 py-1.5 text-xs text-text-primary placeholder:text-text-muted/50"
                              autoFocus
                            />
                            <button
                              onClick={() => handleAdminReply(comment.id)}
                              className="bg-violet text-void font-mono text-[10px] uppercase font-semibold px-4 py-1.5 rounded-xl cursor-pointer hover:bg-violet/90 transition-colors"
                            >
                              Send
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
