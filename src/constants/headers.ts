export const browseScreenOptions = (title: string) =>
  ({
    title,
    headerLargeTitleEnabled: true,
    headerBlurEffect: "regular",
  }) as const;

export const detailScreenOptions = (title = "", headerBackTitle = "Back") =>
  ({
    title,
    headerBackTitle,
    headerBlurEffect: "regular",
  }) as const;
