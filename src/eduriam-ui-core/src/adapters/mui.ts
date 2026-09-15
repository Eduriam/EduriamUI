import * as Mui from "@mui/material";

// Keep the namespace access explicit in the compiled package. Next.js 13 can
// otherwise rewrite named MUI imports from a prebuilt ESM dependency into deep
// default imports without preserving MUI's module interop during server rendering.
export const {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Chip,
  Container,
  createTheme,
  Dialog,
  Divider,
  Drawer,
  Icon,
  InputBase,
  LinearProgress,
  Link,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} = Mui;
