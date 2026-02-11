import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider, Container, Title, Card, Text, Badge, Group, Stack, SimpleGrid, Paper, Divider, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { Session } from "./Session";

function PublicPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch("/_api/session/list");
                if (response.ok) {
                    const data = await response.json();
                    setSessions(data);
                }
            } catch (err) {
                console.error("Erreur lors du chargement des sessions", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    const getAudienceBadgeColor = (audience: number) => {
        switch (audience) {
            case 0: // ElectedRepresentative
                return "blue";
            case 1: // AppointedRepresentative
                return "green";
            default:
                return "gray";
        }
    };

    const getAudienceLabel = (audience: number) => {
        switch (audience) {
            case 0: // ElectedRepresentative
                return "Élu";
            case 1: // AppointedRepresentative
                return "Président de CSE";
            default:
                return "Inconnu";
        }
    };

    const getDelivranceLabel = (delivrance: number) => {
        switch (delivrance) {
            case 0: // Online
                return "À distance";
            case 1: // InPerson
                return "Présentiel";
            default:
                return "Inconnu";
        }
    };

    const getDelivranceBadgeColor = (delivrance: number) => {
        switch (delivrance) {
            case 0: // Online
                return "violet";
            case 1: // InPerson
                return "orange";
            default:
                return "gray";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <MantineProvider>
            <Container size="xl" my={40}>
                <Stack>
                    <Title order={1} ta="center" mb="xl">
                        Catalogue des Formations
                    </Title>
                    <Group justify="flex-end" mb="md">
                        <Button component="a" href="/login" variant="outline">
                            Espace Administration
                        </Button>
                    </Group>
                    <Paper withBorder shadow="md" p={30} radius="md">
                        {loading ? (
                            <Text ta="center" c="dimmed">Chargement des sessions...</Text>
                        ) : sessions.length === 0 ? (
                            <Text ta="center" c="dimmed">Aucune session de formation disponible pour le moment.</Text>
                        ) : (
                            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                                {sessions.map((session) => (
                                    <Card key={session.id} shadow="sm" padding="lg" radius="md" withBorder>
                                        <Stack gap="md">
                                            <div>
                                                <Group justify="space-between" mb="xs">
                                                    <Group gap="xs">
                                                        <Badge color={getAudienceBadgeColor(session.audience)} variant="light">
                                                            {getAudienceLabel(session.audience)}
                                                        </Badge>
                                                        <Badge color={getDelivranceBadgeColor(session.delivrance)} variant="light">
                                                            {getDelivranceLabel(session.delivrance)}
                                                        </Badge>
                                                    </Group>
                                                    <Badge color={session.remainingSeats > 0 ? "green" : "red"} variant="filled">
                                                        {session.remainingSeats > 0 ? `${session.remainingSeats} places` : "Complet"}
                                                    </Badge>
                                                </Group>
                                                <Title order={3} mb="xs">{session.shortDescription}</Title>
                                            </div>
                                            <Divider />
                                            <Stack gap="xs">
                                                <Group gap="xs">
                                                    <Text size="sm" fw={500}>📅 Date de début :</Text>
                                                    <Text size="sm">{formatDate(session.startDate)}</Text>
                                                </Group>
                                                <Group gap="xs">
                                                    <Text size="sm" fw={500}>⏱️ Durée :</Text>
                                                    <Text size="sm">{session.durationInDays} jour{session.durationInDays > 1 ? "s" : ""}</Text>
                                                </Group>
                                            </Stack>
                                            {session.courses && session.courses.length > 0 && (
                                                <>
                                                    <Divider />
                                                    <div>
                                                        <Text size="sm" fw={500} mb="xs">Cours inclus :</Text>
                                                        <Stack gap="xs">
                                                            {session.courses.map((course) => (
                                                                <Paper key={course.id} p="xs" withBorder>
                                                                    <Text size="sm" fw={500}>{course.title}</Text>
                                                                    <Text size="xs" c="dimmed">{course.shortDescription}</Text>
                                                                    {course.instructor && (
                                                                        <Text size="xs" c="dimmed" mt={4}>
                                                                            👨‍🏫 {course.instructor.name} {course.instructor.surname}
                                                                        </Text>
                                                                    )}
                                                                </Paper>
                                                            ))}
                                                        </Stack>
                                                    </div>
                                                </>
                                            )}
                                        </Stack>
                                    </Card>
                                ))}
                            </SimpleGrid>
                        )}
                    </Paper>
                </Stack>
            </Container>
        </MantineProvider>
    );
}

const container = document.getElementById("react-app");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<PublicPage />);
}