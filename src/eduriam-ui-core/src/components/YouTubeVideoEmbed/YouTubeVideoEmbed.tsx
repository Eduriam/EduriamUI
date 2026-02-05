import Box from "@mui/material/Box";

/**
 * Props for the `YouTubeVideoEmbed` component.
 *
 * Embeds a responsive YouTube player centered on the page.
 */
export interface YouTubeVideoEmbedProps {
  /**
   * YouTube video id (the part after `v=` in a watch URL).
   *
   * When omitted, no iframe is rendered.
   */
  videoId?: string;
}

/**
 * Responsive YouTube embed component with a 16:9 aspect ratio.
 *
 * Use this when you need to show a YouTube video inline with other content
 * without manually handling iframe sizing.
 */
export const YouTubeVideoEmbed: React.FC<YouTubeVideoEmbedProps> = ({
  videoId,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {videoId && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope;"
          allowFullScreen
          style={{
            aspectRatio: "16 / 9",
            width: "100%",
            border: 0,
            maxWidth: "600px",
          }}
        />
      )}
    </Box>
  );
};

export default YouTubeVideoEmbed;
