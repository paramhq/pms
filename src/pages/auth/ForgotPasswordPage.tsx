import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import LayersIcon from "@mui/icons-material/Layers";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth";
import { authPageTokens, palette } from "@/theme";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
  };

  return (
    <Paper
      sx={{
        maxWidth: authPageTokens.cardMaxWidth,
        width: "100%",
        mx: 2,
        p: 5,
        borderRadius: `${authPageTokens.cardRadius}px`,
        boxShadow: authPageTokens.cardShadow,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${palette.purple[500]}, ${palette.purple[400]}, ${palette.purple[600]})`,
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
        <Avatar
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            background: `linear-gradient(135deg, ${palette.purple[500]}, ${palette.purple[700]})`,
            mb: 2,
          }}
        >
          <LayersIcon sx={{ fontSize: 24 }} />
        </Avatar>
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: "text.primary" }}>
          Reset password
        </Typography>
      </Box>

      {submitted ? (
        <Box sx={{ textAlign: "center", py: 2 }}>
          <CheckCircleOutlinedIcon sx={{ fontSize: 52, color: "success.main", mb: 2 }} />
          <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>
            Check your email
          </Typography>
          <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 3, maxWidth: 280, mx: "auto" }}>
            We've sent a password reset link to your email address. It expires in 1 hour.
          </Typography>
          <Typography
            component={Link}
            to="/login"
            sx={{
              fontSize: 14,
              color: palette.purple[600],
              textDecoration: "none",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Back to sign in
          </Typography>
        </Box>
      ) : (
        <>
          <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 3, textAlign: "center" }}>
            Enter your email and we'll send you a reset link.
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register("email")}
              label="Email address"
              type="email"
              fullWidth
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 3.5 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{ height: 46, fontSize: 15, mb: 2 }}
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Typography
              component={Link}
              to="/login"
              sx={{
                fontSize: 13,
                color: palette.purple[600],
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Back to sign in
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
}
