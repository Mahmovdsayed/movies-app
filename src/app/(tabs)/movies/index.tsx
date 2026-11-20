import { BrowseGrid } from "@/components/media";
import { MOVIE_BROWSE } from "@/constants/browse";

const MoviesScreen = () => (
  <BrowseGrid path={MOVIE_BROWSE.path} params={MOVIE_BROWSE.params} type="movie" />
);

export default MoviesScreen;
