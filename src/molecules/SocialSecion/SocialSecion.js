import { Grid } from "atoms";
import MemoTwitter from "assets/icons/Twitter";
import MemoShare from "assets/icons/Share";
import MemoGit from "assets/icons/Git";

export const SocialSecion = () => {
  return (
    <Grid gridAutoFlow="column" gridGap="2rem">
      <MemoTwitter fill="#55678B" />
      <MemoShare fill="#55678B" />
      <MemoGit fill="#55678B" />
    </Grid>
  );
};
