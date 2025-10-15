import { ReactNode } from "react";

import { TabContext, TabPanel } from "@mui/lab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

interface TabItem {
  name: string;
  id: string | number;
}

export interface TabBarPanelProps {
  onChange: (newValue: string | number) => void;
  tabs: Array<TabItem>;
  panelContent: ReactNode;
  value: string | number;
}

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
