import { Tabs as MuiTabs, Tab } from "@mui/material";

/**
 * Single tab configuration for the `Tabs` component.
 */
export interface TabsItem {
  /**
   * Label text shown on the tab.
   */
  label: string;

  /**
   * Value emitted when the tab is selected.
   */
  value: string | number;

  /**
   * Whether this tab is disabled.
   */
  disabled?: boolean;
}

/**
 * Props for the `Tabs` component.
 *
 * Controlled full-width tab bar built on top of MUI `Tabs`.
 */
export interface TabsProps {
  /**
   * List of tabs to render.
   */
  tabs: TabsItem[];

  /**
   * Currently selected tab value.
   */
  value: string | number;

  /**
   * Called with the new value when a different tab is selected.
   */
  onChange: (value: string | number) => void;
}

/**
 * Full-width tab bar with a prominent indicator.
 *
 * Use this for switching between a small number of top-level views within
 * the same page (for example “Overview / Details / History”).
 */
export const Tabs: React.FC<TabsProps> = ({ tabs, value, onChange }) => {
  return (
    <MuiTabs
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      variant="fullWidth"
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
      sx={{
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
      }}
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
