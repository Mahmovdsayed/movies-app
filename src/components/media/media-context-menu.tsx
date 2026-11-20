import { Button, ContextMenu, Host, RNHostView } from "@expo/ui/swift-ui";
import { useMediaMenu } from "@/hooks/use-media-menu";
import type { MediaContextMenuProps } from "@/types/media";

export function MediaContextMenu({ item, width, children }: MediaContextMenuProps) {
  const { favorite, toggleFavorite, open, watch } = useMediaMenu(item);

  return (
    <Host style={{ width }} matchContents={{ vertical: true }}>
      <ContextMenu>
        <ContextMenu.Trigger>
          <RNHostView matchContents={{ vertical: true }}>{children}</RNHostView>
        </ContextMenu.Trigger>

        <ContextMenu.Items>
          <Button
            label={favorite ? "Remove from favourites" : "Add to favourites"}
            systemImage={favorite ? "heart.slash" : "heart"}
            onPress={toggleFavorite}
          />
          <Button label="View details" systemImage="info.circle" onPress={open} />
          <Button label="Watch now" systemImage="play.fill" onPress={watch} />
        </ContextMenu.Items>
      </ContextMenu>
    </Host>
  );
}
