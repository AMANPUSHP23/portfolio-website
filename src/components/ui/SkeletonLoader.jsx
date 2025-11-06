import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Base Skeleton Component
 */
export const Skeleton = ({ className, ...props }) => {
  return (
    <motion.div
      className={cn(
        'animate-pulse rounded-md bg-muted/50',
        className
      )}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      {...props}
    />
  );
};

/**
 * Project Card Skeleton
 */
export const ProjectCardSkeleton = () => {
  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <Skeleton className="w-full h-48" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
};

/**
 * Testimonial Card Skeleton
 */
export const TestimonialCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-6 bg-card space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
};

/**
 * Skill Badge Skeleton
 */
export const SkillBadgeSkeleton = () => {
  return (
    <Skeleton className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl" />
  );
};

/**
 * Timeline Item Skeleton
 */
export const TimelineItemSkeleton = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="w-0.5 h-24 mt-2" />
      </div>
      <div className="flex-1 pb-8 space-y-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
};

/**
 * Experience Card Skeleton
 */
export const ExperienceCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-6 bg-card space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
};

/**
 * Grid Skeleton - Reusable grid layout for skeletons
 */
export const GridSkeleton = ({ 
  count = 6, 
  SkeletonComponent = ProjectCardSkeleton,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
}) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonComponent key={idx} />
      ))}
    </div>
  );
};

/**
 * Section Skeleton - Full section with title
 */
export const SectionSkeleton = ({ showTitle = true, children }) => {
  return (
    <div className="py-16 space-y-8">
      {showTitle && (
        <div className="text-center space-y-4">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
      )}
      {children}
    </div>
  );
};

export default Skeleton;
