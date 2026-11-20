import type { ReactElement, ReactNode } from "react";

import type { MediaItem, MediaType, TmdbParams } from "./tmdb";

export interface MediaGridCardProps {
  item: MediaItem;
  width: number;
}

export interface BrowseGridProps {
  path: string;
  params?: TmdbParams;
  type: MediaType;
}

export interface MediaContextMenuProps {
  item: MediaItem;
  width: number;
  children: ReactElement;
}

export interface MediaGridProps {
  items: MediaItem[];
  header?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  isLoading: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  error?: Error;
}
