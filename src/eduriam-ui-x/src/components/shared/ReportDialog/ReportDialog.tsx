import {
  BasicNavbar,
  ContentContainer,
  DrawerSelect,
  type DrawerSelectSection,
  FullscreenDialog,
  LargeButton,
  PageRoot,
  Select,
  TextField,
} from "@eduriam/ui-core";

import { useEffect, useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface ReportDialogSubmitPayload {
  problemTypeId: string;
  description: string;
}

export interface ReportDialogLocalization {
  header: string;
  problemTypeLabel?: string;
  problemTypePlaceholder: string;
  descriptionPlaceholder: string;
  submitLabel: string;
  thankYouSection?: {
    title?: string;
    description?: string;
    continueButton?: string;
  };
}

export interface ReportDialogDataTest {
  report?: {
    section?: string;
    problemTypeSelectButton?: string;
    problemDescriptionField?: string;
    submitButton?: string;
  };

  selectDrawer?: {
    section?: string;
  };

  thankYouSection: {
    section?: string;
    continueButton?: string;
  };
}

export interface ReportDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: ReportDialogSubmitPayload) => void;
  problemTypeSections: DrawerSelectSection[];
  localization: ReportDialogLocalization;
  dataTest?: ReportDialogDataTest;
}

export const ReportDialog: React.FC<ReportDialogProps> = ({
  open,
  onClose,
  onSubmit,
  problemTypeSections,
  localization,
  dataTest,
}) => {
  const [problemTypeDrawerOpen, setProblemTypeDrawerOpen] = useState(false);
  const [selectedProblemTypeId, setSelectedProblemTypeId] = useState<
    string | undefined
  >();
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submittedTitle =
    localization.thankYouSection?.title ?? "Thank you for your feedback!";
  const submittedDescription =
    localization.thankYouSection?.description ??
    "We will review your problem report as soon as possible.";
  const continueLabel = localization.thankYouSection?.continueButton ?? "Continue";

  const selectedProblemTypeLabel = useMemo(() => {
    if (!selectedProblemTypeId) {
      return undefined;
    }

    for (const section of problemTypeSections) {
      const option = section.options.find(
        (entry) => entry.id === selectedProblemTypeId,
      );
      if (option) {
        return option.label;
      }
    }

    return undefined;
  }, [problemTypeSections, selectedProblemTypeId]);

  const resetState = () => {
    setProblemTypeDrawerOpen(false);
    setSelectedProblemTypeId(undefined);
    setDescription("");
    setSubmitted(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSubmit = () => {
    if (!selectedProblemTypeId) {
      return;
    }

    onSubmit({
      problemTypeId: selectedProblemTypeId,
      description: description.trim(),
    });
    setSubmitted(true);
  };

  useEffect(() => {
    if (!open) {
      setProblemTypeDrawerOpen(false);
      setSelectedProblemTypeId(undefined);
      setDescription("");
      setSubmitted(false);
    }
  }, [open]);

  const handleContinue = () => {
    handleClose();
  };

  return (
    <>
      <FullscreenDialog open={open} onClose={handleClose}>
        <PageRoot>
          {!submitted && (
            <BasicNavbar
              header={localization.header}
              leftButton={{
                icon: "chevronLeft",
                onClick: handleClose,
              }}
            />
          )}
          <ContentContainer
            width="small"
            justifyContent="flex-start"
            paddingTop="large"
          >
            {submitted ? (
              <Box
                data-test={dataTest?.thankYouSection?.section}
                sx={{
                  width: "273px",
                  mx: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3.5,
                }}
              >
                <Typography
                  sx={{
                    typography: "h4",
                    textAlign: "center",
                  }}
                >
                  {submittedTitle}
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                  {submittedDescription}
                </Typography>
              </Box>
            ) : (
              <Box
                data-test={dataTest?.report?.section}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Select
                  data-test={dataTest?.report?.problemTypeSelectButton}
                  fullWidth
                  label={localization.problemTypeLabel}
                  onClick={() => setProblemTypeDrawerOpen(true)}
                  placeholder={localization.problemTypePlaceholder}
                  value={selectedProblemTypeLabel}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  data-test={dataTest?.report?.problemDescriptionField}
                  placeholder={localization.descriptionPlaceholder}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Box>
            )}

            <Box sx={{ mt: "auto" }}>
              <LargeButton
                fullWidth
                color="primary"
                variant="contained"
                disabled={!submitted && !selectedProblemTypeId}
                onClick={submitted ? handleContinue : handleSubmit}
                data-test={
                  submitted
                    ? dataTest?.thankYouSection?.continueButton
                    : dataTest?.report?.submitButton
                }
              >
                {submitted ? continueLabel : localization.submitLabel}
              </LargeButton>
            </Box>
          </ContentContainer>
        </PageRoot>
      </FullscreenDialog>

      <DrawerSelect
        open={problemTypeDrawerOpen && !submitted}
        onClose={() => setProblemTypeDrawerOpen(false)}
        sections={problemTypeSections}
        drawerZIndex={1301}
        data-test={dataTest?.selectDrawer?.section}
        selectedOptionId={selectedProblemTypeId}
        onChange={({ optionId }) => {
          setSelectedProblemTypeId(optionId);
          setProblemTypeDrawerOpen(false);
        }}
      />
    </>
  );
};

export default ReportDialog;

