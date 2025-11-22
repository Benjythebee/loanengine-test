import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Badge } from "../badge";
import { cn } from "@/lib/utils";

type FullAvatarControl = {
  className?: string;
  src?: string;
  size: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  alt?: string;
  showImage?: boolean;
};

const meta: Meta<FullAvatarControl> = {
  title: "Primitives/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      mapping: {
        sm: "size-6",
        md: "size-8",
        lg: "size-12",
        xl: "size-16",
      },
    },
    src: {
      control: "text",
    },
    fallback: {
      control: "text",
      description: "Fallback text when image is not available",
    },
    alt: {
      control: "text",
      description: "Alt text for the avatar image",
    },
    showImage: {
      control: "boolean",
      description: "Toggle to show or hide the avatar image",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "",
    size: "md",
    src: "https://github.com/shadcn.png",
    fallback: "CN",
    alt: "@shadcn",
    showImage: true,
  },
  render: ({ size, src, fallback, alt, showImage, ...args }) => (
    <Avatar className={cn(size, args.className)}>
      {(() => {
        console.log("size:", size);
        return null;
      })()}
      {showImage && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  parameters: {
    controls: {
      include: ["fallback"],
    },
  },
  args: {
    fallback: "BU",
  },
  render: ({ fallback }) => (
    <Avatar>
      <AvatarImage src="https://broken-image-url.png" alt="@broken" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  ),
};

export const FallbackOnly: Story = {
  parameters: {
    controls: {
      include: ["fallback"],
    },
  },
  args: {
    fallback: "BU",
  },
  render: ({ fallback }) => (
    <Avatar>
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="size-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-xs">S</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-sm">M</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-lg">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const UserProfiles: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="space-y-4">
      {/* Single user */}
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">shadcn</p>
          <p className="text-xs text-muted-foreground">@shadcn</p>
        </div>
      </div>

      {/* User with status */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VL</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5">
            <Badge variant="default" className="h-3 w-3 p-0 text-[0px]">
              <span className="sr-only">Online</span>
            </Badge>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Vercel</p>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>
    </div>
  ),
};

export const AvatarGroup: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback>VL</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background bg-muted">
        <AvatarFallback className="text-xs">+2</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const CustomColors: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback className="bg-red-500 text-white">RD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-blue-500 text-white">BL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-green-500 text-white">GR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-purple-500 text-white">PR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-gradient-to-r from-pink-500 to-violet-500 text-white">
          GD
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithBadges: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex items-center gap-6">
      {/* Online status */}
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>ON</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background"></div>
      </div>

      {/* Away status */}
      <div className="relative">
        <Avatar>
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-yellow-500 border-2 border-background"></div>
      </div>

      {/* Offline status */}
      <div className="relative">
        <Avatar>
          <AvatarFallback>OF</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gray-400 border-2 border-background"></div>
      </div>

      {/* Notification badge */}
      <div className="relative">
        <Avatar>
          <AvatarFallback>NT</AvatarFallback>
        </Avatar>
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
        >
          3
        </Badge>
      </div>
    </div>
  ),
};
