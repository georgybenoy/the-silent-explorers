export interface Citation {
  id: string;
  nssdcaId?: string;
  title: string;
  authorOrCenter: string;
  sourceType: 'NSSDCA Master Catalog' | 'JPL Mission Archive' | 'JPL Mission Documentation' | 'NASA Mission Documentation' | 'Apollo Lunar Surface Journal' | 'NASA History Division' | 'Planetary Data System' | 'Scientific Publication';
  publicationDate?: string;
  url: string;
  summary: string;
  relatedArtifactIds: string[];
}
