import { ReactNode } from "react";

import { TabContext, TabPanel } from "@mui/lab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

/**
 * Configuration for a single tab in `TabBarPanel`.
 */
interface TabItem {
  /**
   * Label text shown on the tab.
   */
  name: string;

  /**
   * Value for the tab, used as the active `value`.
   */
  id: string | number;
}

/**
 * Props for the `TabBarPanel` component.
 *
 * Renders a scrollable tab bar above a content area using MUI Lab `TabContext`.
 */
export interface TabBarPanelProps {
  /**
   * Called when the active tab changes with the new value.
   */
  onChange: (newValue: string | number) => void;

  /**
   * List of tabs to render in the bar.
   */
  tabs: Array<TabItem>;

  /**
   * Content to render inside each `TabPanel`.
   *
   * The same `panelContent` is rendered for every tab; use the active
   * value outside this component to decide what to show.
   */
  panelContent: ReactNode;

  /**
   * Currently selected tab value.
   */
  value: string | number;
}

/**
 * Scrollable tab bar with a card container and shared panel content.
 *
 * Use this when you want a compact tab strip above a shared content area.
 */
export const TabBarPanel: React.FC<TabBarPanelProps> = ({
  onChange,
  tabs,
  panelContent,
  value,
}) => {
  return (
    <TabContext value={value as any}>
      <Card>
        <CardContent
          sx={{
            p: 1,
            "&:last-child": { paddingBottom: 1 },
          }}
        >
          <Tabs
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { background: "rgba(0,0,0,0)" } }}
          >
            {tabs?.map((item: TabItem) => (
              <Tab
                label={item.name}
                value={item.id}
                key={item.id}
                sx={{
                  "&.Mui-selected": {
                    color: "primary.contrastText",
                    backgroundColor: "primary.main",
                    borderRadius: 1,
                  },
                  minWidth: "fit-content",
                  maxWidth: "100%",
                  flex: 1,
                }}
              />
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {tabs?.map((item: TabItem) => (
        <TabPanel value={item.id as any} sx={{ pt: 1, px: 0 }} key={item.id}>
          {panelContent}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default TabBarPanel;
