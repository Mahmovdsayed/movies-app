import { BrowseGrid } from "@/components/media";
import { TV_BROWSE } from "@/constants/browse";

const TvShowsScreen = () => (
  <BrowseGrid path={TV_BROWSE.path} params={TV_BROWSE.params} type="tv" />
);

export default TvShowsScreen;
