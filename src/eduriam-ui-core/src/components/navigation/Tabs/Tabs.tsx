import { Tabs as MuiTabs, TabsProps as MuiTabsProps, Tab } from "@mui/material";

export interface TabsItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface TabsProps extends Omit<
  MuiTabsProps,
  "value" | "onChange" | "children"
> {
  tabs: TabsItem[];
  value: string | number;
  onChange: (value: string | number) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  onChange,
  sx,
  ...rest
}) => {
  return (
    <MuiTabs
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      variant="fullWidth"
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
      sx={[
        {
          borderBottom: 1,
          borderColor: "divider",
          minHeight: 48,
          "& .MuiTabs-indicator": {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
            height: 4,
          },
          "& .MuiTabs-indicatorSpan": {
            width: 80,
            backgroundColor: "primary.main",
            borderRadius: 4,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ].filter(Boolean)}
      {...rest}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          disabled={tab.disabled}
          sx={{
            minHeight: 48,
            minWidth: 0,
            flex: 1,
            padding: 0,
            textTransform: "none",
            fontSize: 16,
            fontWeight: 700,
            color: "text.secondary",
            "&.Mui-selected": {
              color: "text.primary",
            },
          }}
        />
      ))}
    </MuiTabs>
  );
};

export default Tabs;
