import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import LayersIcon from "@mui/icons-material/Layers";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useAuth } from "@/contexts/AuthContext";
import { authPageTokens, palette } from "@/theme";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch {
      setError("Invalid email or password");
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
        // Top purple accent bar
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
          Welcome back
        </Typography>
        <Typography sx={{ fontSize: 14, color: "text.secondary", mt: 0.5 }}>
          Sign in to your ProjectHub account
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2.5 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("email")}
          label="Email address"
          type="email"
          fullWidth
          autoFocus
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
          sx={{ mb: 3.5 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{ height: 46, fontSize: 15, mb: 2 }}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Typography
          component={Link}
          to="/forgot-password"
          sx={{
            fontSize: 13,
            color: palette.purple[600],
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Forgot password?
        </Typography>
        <Typography
          component={Link}
          to="/register"
          sx={{
            fontSize: 13,
            color: palette.purple[600],
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Create account
        </Typography>
      </Box>
    </Paper>
  );
}
