import {
  Breadcrumbs,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React from "react";

type RoutedLink = {
  label: string;
  href: string;
};

type RoutedHeaderProps = {
  title: string;
  routedLinks: RoutedLink[];
  children?: React.ReactNode; // actions
};

export default function RoutedHeader({
  title,
  routedLinks,
  children,
}: RoutedHeaderProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={2}
      sx={{ mb: 4 }}
    >
      <Stack spacing={0.5}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 1 }}
        >
          {routedLinks.map((link, index) =>
            index === routedLinks.length - 1 ? (
              <Typography
                key={link.href}
                color="text.primary"
                sx={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                {link.label}
              </Typography>
            ) : (
              <MuiLink
                key={link.href}
                underline="hover"
                color="inherit"
                href={link.href}
                sx={{ fontSize: "0.875rem" }}
              >
                {link.label}
              </MuiLink>
            )
          )}
        </Breadcrumbs>

        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Stack>

      {children && (
        <Stack direction="row" spacing={2}>
          {children}
        </Stack>
      )}
    </Stack>
  );
}
