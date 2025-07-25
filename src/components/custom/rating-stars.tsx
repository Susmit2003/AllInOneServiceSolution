"use client"

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  totalReviews?: number;
  size?: number;
  color?: string;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function RatingStars({
  rating,
  totalReviews,
  size = 18,
  color = "text-yellow-400",
  className,
  interactive = false,
  onRatingChange,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (rate: number) => {
    if (!interactive || !onRatingChange) return;
    setCurrentRating(rate);
    onRatingChange(rate);
  };

  const handleMouseEnter = (rate: number) => {
    if (!interactive) return;
    setHoverRating(rate);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };
  
  const displayRating = interactive ? (hoverRating || currentRating) : rating;

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(
            star <= displayRating ? color : "text-gray-300 dark:text-gray-600",
            interactive && "cursor-pointer transition-transform hover:scale-125"
          )}
          fill={star <= displayRating ? "currentColor" : "none"}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          aria-label={interactive ? `Rate ${star} star${star > 1 ? 's' : ''}` : `${star} star${star > 1 ? 's' : ''} rating`}
          role={interactive ? "button" : "img"}
          tabIndex={interactive ? 0 : -1}
          onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(star); } : undefined}
        />
      ))}
      {totalReviews !== undefined && (
        <span className="ml-2 text-sm text-muted-foreground">
          ({totalReviews} review{totalReviews !== 1 ? 's' : ''})
        </span>
      )}
    </div>
  );
}
