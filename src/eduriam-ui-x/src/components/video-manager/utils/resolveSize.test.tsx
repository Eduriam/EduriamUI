import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";

import type { IGif } from "../video-components/components/Gif/Gif";
import { Gif } from "../video-components/components/Gif/Gif";
import type { IImage } from "../video-components/components/Image/Image";
import { Image } from "../video-components/components/Image/Image";
import type { IVideo } from "../video-components/components/Video/Video";
import { Video } from "../video-components/components/Video/Video";
import { resolveSize } from "./resolveSize";

describe("resolveSize", () => {
  it("maps named sizes to responsive percentages", () => {
    expect(resolveSize("SMALL")).toBe("25%");
    expect(resolveSize("MEDIUM")).toBe("50%");
    expect(resolveSize("LARGE")).toBe("75%");
  });

  it("uses medium size by default", () => {
    expect(resolveSize(undefined)).toBe("50%");
  });

  it("treats numeric values as percentages", () => {
    expect(resolveSize(40)).toBe("40%");
  });
});

describe("media components responsive width wiring", () => {
  it("applies percentage width in Image component styles", () => {
    const comp: IImage = {
      id: "img-1",
      type: "IMAGE",
      startTime: 0,
      column: "first",
      url: "https://example.com/image.png",
      size: "SMALL",
    };

    const element = Image({
      comp,
    });

    const root = element as ReactElement<{ children: ReactElement<{ sx: Record<string, string> }> }>;
    const imageBox = root.props.children;
    expect(imageBox.props.sx.width).toBe("25%");
    expect(imageBox.props.sx.height).toBe("auto");
  });

  it("applies percentage width in Video component styles", () => {
    const comp: IVideo = {
      id: "video-1",
      type: "VIDEO",
      startTime: 0,
      column: "first",
      url: "https://example.com/video.mp4",
      size: 40,
    };

    const element = Video({
      comp,
    });

    const root = element as ReactElement<{ children: ReactElement<{ sx: Record<string, string> }> }>;
    const videoBox = root.props.children;
    expect(videoBox.props.sx.width).toBe("40%");
    expect(videoBox.props.sx.height).toBe("auto");
  });

  it("styles Gif with responsive width and auto height without fixed width/height props", () => {
    const comp: IGif = {
      id: "gif-1",
      type: "GIF",
      startTime: 0,
      column: "first",
      url: "https://example.com/anim.gif",
      size: "LARGE",
    };

    const element = Gif({
      comp,
    });

    const root = element as ReactElement<{
      children: ReactElement<{
        style: Record<string, string>;
        width?: number;
        height?: number;
      }>;
    }>;
    const gifNode = root.props.children;
    expect(gifNode.props.style.width).toBe("75%");
    expect(gifNode.props.style.height).toBe("auto");
    expect(gifNode.props.width).toBeUndefined();
    expect(gifNode.props.height).toBeUndefined();
  });
});
