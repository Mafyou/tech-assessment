import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider, Container, Paper, Title, TextInput, Button, Group, Stack } from "@mantine/core";
import { useState } from "react";

function LoginPage() {
    const [login, setLogin] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/_api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login }),
            });

            if (response.ok) {
                window.location.href = "/admin";
            } else {
                const errorText = await response.text();
                setError(errorText || "Identifiant invalide");
            }
        } catch (err) {
            setError("Erreur de connexion au serveur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MantineProvider>
            <Container size={420} my={40}>
                <a href="/" style={{ display: "block", marginBottom: 16, textDecoration: "none", color: "#228be6", fontWeight: 500 }}>
                    ← Retour à l'accueil
                </a>
                <Title ta="center" mb="xl">
                    Connexion Administration
                </Title>
                <Paper withBorder shadow="md" p={30} radius="md">
                    <form onSubmit={handleSubmit}>
                        <Stack>
                            <TextInput
                                label="Identifiant"
                                placeholder="formation ou sales"
                                value={login}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.currentTarget.value)}
                                required
                                error={error}
                            />
                            <Group justify="space-between" mt="md">
                                <Button type="submit" fullWidth loading={loading}>
                                    Se connecter
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </MantineProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById("react-app") as HTMLElement);
root.render(<LoginPage />);
