import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import LayersIcon from "@mui/icons-material/Layers";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { useAuth } from "@/contexts/AuthContext";
import { authPageTokens, palette } from "@/theme";

export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      await authRegister(data.fullName, data.email, data.password);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Registration failed. Please try again.");
    }
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
          Create your account
        </Typography>
        <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 0.5 }}>
          Get started with ProjectHub for free
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2.5 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("fullName")}
          label="Full name"
          fullWidth
          autoFocus
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          sx={{ mb: 2.5 }}
        />
        <TextField
          {...register("email")}
          label="Email address"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2.5 }}
        />
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2.5 }}
        />
        <TextField
          {...register("confirmPassword")}
          label="Confirm password"
          type="password"
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={{ mb: 3.5 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{ height: 46, fontSize: 15, mb: 2 }}
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
          Already have an account?{" "}
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
            Sign in
          </Typography>
        </Typography>
      </Box>
    </Paper>
  );
}
