'use client';

import { useState, useRef } from 'react';
import { Movie } from '@/lib/types';
import { addReviewToMovie } from '@/lib/api';

interface ReviewSectionProps {
  movie: Movie;
}

export default function ReviewSection({ movie }: ReviewSectionProps) {
  const [reviews, setReviews] = useState(movie.reviewID || []);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!reviewText.trim()) {
      setError('Please enter a review');
      return;
    }

    if (reviewText.length < 10) {
      setError('Review must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      await addReviewToMovie(movie.imdbID, reviewText);
      
      // Add review to local state
      setReviews([
        ...reviews,
        {
          id: Date.now().toString(),
          body: reviewText,
        },
      ]);

      setReviewText('');
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Review Form */}
      <div className="bg-card rounded-lg border border-border p-6 md:p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Write a Review</h2>
        
        <form ref={formRef} onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <textarea
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                setError('');
              }}
              placeholder="Share your thoughts about this movie..."
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="bg-card rounded-lg border border-border p-6 md:p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Reviews ({reviews.length})
        </h2>

        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No reviews yet. Be the first to review this movie!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 rounded-lg bg-background border border-border"
              >
                <p className="text-foreground leading-relaxed">{review.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
