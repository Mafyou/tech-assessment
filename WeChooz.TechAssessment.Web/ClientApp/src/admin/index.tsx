import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider, Container, Title, Table, Button, Group, Stack, Modal, TextInput, NumberInput, Select, Paper } from "@mantine/core";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Session } from "./Session";
import { Course } from "./Course";
import { Participant } from "./Participant";
import { ParticipantFormData } from "./ParticipantFormData";
import { CourseFormData } from "./CourseFormData";
import { SessionFormData } from "./SessionFormData";
import { UserRole } from "./UserRole";

function AdminPage() {
const [sessions, setSessions] = useState<Session[]>([]);
const [loading, setLoading] = useState(false);
const [opened, { open, close }] = useDisclosure(false);
const [participantsOpened, { open: openParticipants, close: closeParticipants }] = useDisclosure(false);
const [editingSession, setEditingSession] = useState<Session | null>(null);
const [selectedSession, setSelectedSession] = useState<Session | null>(null);
const [participants, setParticipants] = useState<Participant[]>([]);
const [courses, setCourses] = useState<Course[]>([]);
const [userRole, setUserRole] = useState<string>("");
const [participantFormData, setParticipantFormData] = useState<ParticipantFormData>({
    name: "",
    surname: "",
    email: "",
    company: "",
});
const [courseFormData, setCourseFormData] = useState<CourseFormData>({
    title: "",
    shortDescription: "",
    description: "",
    durationInDays: 1,
    audiance: 0,
    maxAttendees: 10,
    instructorName: "",
    instructorSurname: "",
});
const [formData, setFormData] = useState<SessionFormData>({
    shortDescription: "",
    audience: 0,
    startDate: "",
    durationInDays: 1,
    delivrance: 0,
    remainingSeats: 10,
});

const getAudienceLabel = (audience: number) => {
    return audience === 0 ? "Élu" : "Président";
};

const getDelivranceLabel = (delivrance: number) => {
    return delivrance === 0 ? "En ligne" : "En présentiel";
};

    const fetchUserRole = async () => {
        try {
            const response = await fetch("/_api/admin/role");
            if (response.ok) {
                const data: UserRole = await response.json();
                setUserRole(data.role);
            }
        } catch (err) {
            console.error("Erreur lors du chargement du rôle", err);
        }
    };

    const fetchSessions = async () => {
        setLoading(true);
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

    useEffect(() => {
        fetchUserRole();
        fetchSessions();
    }, []);

    const handleOpenCreate = () => {
        setEditingSession(null);
        setFormData({
            shortDescription: "",
            audience: 0,
            startDate: "",
            durationInDays: 1,
            delivrance: 0,
            remainingSeats: 10,
        });
        open();
    };

    const handleOpenEdit = (session: Session) => {
        setEditingSession(session);
        setFormData({
            shortDescription: session.shortDescription,
            audience: typeof session.audience === 'string' ? 0 : session.audience,
            startDate: session.startDate.split('T')[0],
            durationInDays: session.durationInDays,
            delivrance: typeof session.delivrance === 'string' ? 0 : session.delivrance,
            remainingSeats: session.remainingSeats,
        });
        fetchCourses(session.id);
        setCourseFormData({
            title: "",
            shortDescription: "",
            description: "",
            durationInDays: 1,
            audiance: 0,
            maxAttendees: 10,
            instructorName: "",
            instructorSurname: "",
        });
        open();
    };

    const handleSubmit = async () => {
        if (!formData.shortDescription.trim()) {
            alert("La description est obligatoire");
            return;
        }
        if (!formData.startDate) {
            alert("La date de début est obligatoire");
            return;
        }
        if (formData.durationInDays < 1) {
            alert("La durée doit être d'au moins 1 jour");
            return;
        }
        if (formData.remainingSeats < 0) {
            alert("Le nombre de places ne peut pas être négatif");
            return;
        }

        try {
            const url = editingSession ? "/_api/session/update" : "/_api/session/create";
            const method = editingSession ? "PUT" : "POST";
            
            const payload = editingSession 
                ? {
                    id: editingSession.id,
                    ...formData
                }
                : {
                    ...formData
                };

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                close();
                fetchSessions();
            } else {
                const errorText = await response.text();
                alert(`Erreur lors de la sauvegarde de la session: ${errorText}`);
            }
        } catch (err) {
            alert("Erreur de connexion au serveur");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette session ?")) {
            return;
        }

        try {
            const response = await fetch("/_api/session/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                fetchSessions();
            } else {
                alert("Erreur lors de la suppression de la session");
            }
        } catch (err) {
            alert("Erreur de connexion au serveur");
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/_api/admin/logout", {
                method: "POST",
            });
            window.location.href = "/login";
        } catch (err) {
            console.error("Erreur lors de la déconnexion", err);
        }
    };

    const handleOpenParticipants = async (session: Session) => {
        setSelectedSession(session);
        await fetchParticipants(session.id);
        setParticipantFormData({ name: "", surname: "", email: "", company: "" });
        openParticipants();
    };

    const fetchParticipants = async (sessionId: number) => {
        try {
            const response = await fetch(`/_api/participant/list?sessionId=${sessionId}`);
            if (response.ok) {
                const data = await response.json();
                setParticipants(data);
            }
        } catch (err) {
            console.error("Erreur lors du chargement des participants", err);
        }
    };

    const fetchCourses = async (sessionId: number) => {
        try {
            const response = await fetch(`/_api/course/list-by-session?sessionId=${sessionId}`);
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            }
        } catch (err) {
            console.error("Erreur lors du chargement des cours", err);
        }
    };

    const handleAddParticipant = async () => {
        if (!selectedSession) return;
        
        if (!participantFormData.name.trim() || !participantFormData.surname.trim() || 
            !participantFormData.email.trim() || !participantFormData.company.trim()) {
            alert("Tous les champs sont obligatoires");
            return;
        }

        try {
            const response = await fetch("/_api/participant/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...participantFormData,
                    sessionId: selectedSession.id,
                }),
            });

            if (response.ok) {
                await fetchParticipants(selectedSession.id);
                setParticipantFormData({ name: "", surname: "", email: "", company: "" });
                fetchSessions(); // Refresh pour mettre à jour le nombre de places
            } else {
                const errorText = await response.text();
                alert(`Erreur: ${errorText}`);
            }
        } catch (err) {
            alert("Erreur de connexion au serveur");
        }
    };

    const handleDeleteParticipant = async (participantId: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce participant ?")) {
            return;
        }

        try {
            const response = await fetch("/_api/participant/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: participantId }),
            });

            if (response.ok) {
                if (selectedSession) {
                    await fetchParticipants(selectedSession.id);
                }
                fetchSessions(); // Refresh pour mettre à jour le nombre de places
            } else {
                alert("Erreur lors de la suppression du participant");
            }
        } catch (err) {
            alert("Erreur de connexion au serveur");
        }
    };

    const handleAddCourse = async () => {
        if (!editingSession) return;
        
        if (!courseFormData.title.trim() || !courseFormData.shortDescription.trim() || 
            !courseFormData.description.trim() || !courseFormData.instructorName.trim() || 
            !courseFormData.instructorSurname.trim()) {
            alert("Tous les champs sont obligatoires");
            return;
        }

        try {
            const response = await fetch("/_api/course/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...courseFormData,
                    instructor: {
                        name: courseFormData.instructorName,
                        surname: courseFormData.instructorSurname,
                    },
                    sessionId: editingSession.id,
                }),
            });

            if (response.ok) {
                await fetchCourses(editingSession.id);
                setCourseFormData({
                    title: "",
                    shortDescription: "",
                    description: "",
                    durationInDays: 1,
                    audiance: 0,
                    maxAttendees: 10,
                    instructorName: "",
                    instructorSurname: "",
                });
            } else {
                const errorText = await response.text();
                alert(`Erreur: ${errorText}`);
            }
        } catch (err) {
            alert("Erreur de connexion au serveur");
        }
    };

    const handleDeleteCourse = async (courseId: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
            return;
        }

        try {
            const response = await fetch("/_api/course/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: courseId }),
            });

            if (response.ok) {
                if (editingSession) {
                    await fetchCourses(editingSession.id);
                }
            } else {
                alert("Erreur lors de la suppression du cours");
            }
        } catch (err) {
            alert("Erreur de connexion au serveur");
        }
    };

    return (
        <MantineProvider>
            <Container size="xl" my={40}>
                <Stack>
                    <Group justify="space-between">
                        <Title order={1}>Administration des Sessions</Title>
                        <Group>
                            {userRole === "formation" && (
                                <Button onClick={handleOpenCreate}>Créer une session</Button>
                            )}
                            <Button variant="outline" onClick={handleLogout}>Déconnexion</Button>
                        </Group>
                    </Group>

                    <Paper withBorder shadow="sm" p="md">
                        {loading ? (
                            <p>Chargement...</p>
                        ) : sessions.length === 0 ? (
                            <p>Aucune session trouvée</p>
                        ) : (
                            <Table striped highlightOnHover>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Description</Table.Th>
                                        <Table.Th>Public</Table.Th>
                                        <Table.Th>Date de début</Table.Th>
                                        <Table.Th>Durée (jours)</Table.Th>
                                        <Table.Th>Mode de délivrance</Table.Th>
                                        <Table.Th>Places restantes</Table.Th>
                                        <Table.Th>Participants</Table.Th>
                                        <Table.Th>Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {sessions.map((session) => (
                                        <Table.Tr key={session.id}>
                                            <Table.Td>{session.shortDescription}</Table.Td>
                                            <Table.Td>{getAudienceLabel(session.audience)}</Table.Td>
                                            <Table.Td>{new Date(session.startDate).toLocaleDateString()}</Table.Td>
                                            <Table.Td>{session.durationInDays}</Table.Td>
                                            <Table.Td>{getDelivranceLabel(session.delivrance)}</Table.Td>
                                            <Table.Td>{session.remainingSeats}</Table.Td>
                                            <Table.Td>
                                                <Button 
                                                    size="xs" 
                                                    variant="light"
                                                    onClick={() => handleOpenParticipants(session)}
                                                >
                                                    Gérer ({session.participants?.length || 0})
                                                </Button>
                                            </Table.Td>
                                            <Table.Td>
                                                {userRole === "formation" ? (
                                                    <Group gap="xs">
                                                        <Button size="xs" onClick={() => handleOpenEdit(session)}>
                                                            Modifier
                                                        </Button>
                                                        <Button size="xs" color="red" onClick={() => handleDelete(session.id)}>
                                                            Supprimer
                                                        </Button>
                                                    </Group>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        )}
                    </Paper>
                </Stack>

                <Modal opened={opened} onClose={close} title={editingSession ? "Modifier la session" : "Créer une session"} size="lg">
                    <Stack>
                        <TextInput
                            label="Description"
                            placeholder="Description courte de la session"
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.currentTarget.value })}
                            required
                        />
                        <Select
                            label="Public"
                            placeholder="Sélectionnez le public"
                            value={formData.audience.toString()}
                            onChange={(value) => setFormData({ ...formData, audience: parseInt(value || "0") })}
                            data={[
                                { value: "0", label: "Élu" },
                                { value: "1", label: "Président" },
                            ]}
                            required
                        />
                        <Select
                            label="Mode de délivrance"
                            placeholder="Sélectionnez le mode de délivrance"
                            value={formData.delivrance.toString()}
                            onChange={(value) => setFormData({ ...formData, delivrance: parseInt(value || "0") })}
                            data={[
                                { value: "0", label: "En ligne" },
                                { value: "1", label: "En présentiel" },
                            ]}
                            required
                        />
                        <TextInput
                            label="Date de début"
                            type="date"
                            value={formData.startDate}
                            onChange={(e:any) => setFormData({ ...formData, startDate: e.currentTarget.value })}
                            required
                        />
                        <NumberInput
                            label="Durée (en jours)"
                            placeholder="Nombre de jours"
                            value={formData.durationInDays}
                            onChange={(value:any) => setFormData({ ...formData, durationInDays: Number(value) || 1 })}
                            min={1}
                            required
                        />
                        <NumberInput
                            label="Places restantes"
                            placeholder="Nombre de places disponibles"
                            value={formData.remainingSeats}
                            onChange={(value:any) => setFormData({ ...formData, remainingSeats: Number(value) || 0 })}
                            required
                        />
                        
                        {editingSession && (
                            <>
                                <Title order={3} mt="xl">Cours associés</Title>
                                {courses.length === 0 ? (
                                    <p>Aucun cours associé</p>
                                ) : (
                                    <Table striped size="sm">
                                        <Table.Thead>
                                            <Table.Tr>
                                                <Table.Th>Titre</Table.Th>
                                                <Table.Th>Description</Table.Th>
                                                <Table.Th>Instructeur</Table.Th>
                                                <Table.Th>Actions</Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {courses.map((course) => (
                                                <Table.Tr key={course.id}>
                                                    <Table.Td>{course.title}</Table.Td>
                                                    <Table.Td>{course.shortDescription}</Table.Td>
                                                    <Table.Td>{course.instructor?.name} {course.instructor?.surname}</Table.Td>
                                                    <Table.Td>
                                                        <Button 
                                                            size="xs" 
                                                            color="red" 
                                                            onClick={() => handleDeleteCourse(course.id)}
                                                        >
                                                            Supprimer
                                                        </Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                            ))}
                                        </Table.Tbody>
                                    </Table>
                                )}

                                <Title order={4} mt="md">Ajouter un cours</Title>
                                <TextInput
                                    label="Titre"
                                    placeholder="Titre du cours"
                                    value={courseFormData.title}
                                    onChange={(e) => setCourseFormData({ ...courseFormData, title: e.currentTarget.value })}
                                    required
                                />
                                <TextInput
                                    label="Description courte"
                                    placeholder="Description courte"
                                    value={courseFormData.shortDescription}
                                    onChange={(e) => setCourseFormData({ ...courseFormData, shortDescription: e.currentTarget.value })}
                                    required
                                />
                                <TextInput
                                    label="Description complète"
                                    placeholder="Description complète"
                                    value={courseFormData.description}
                                    onChange={(e) => setCourseFormData({ ...courseFormData, description: e.currentTarget.value })}
                                    required
                                />
                                <Group grow>
                                    <NumberInput
                                        label="Durée (jours)"
                                        placeholder="Durée"
                                        value={courseFormData.durationInDays}
                                        onChange={(value:any) => setCourseFormData({ ...courseFormData, durationInDays: Number(value) || 1 })}
                                        min={1}
                                        required
                                    />
                                    <NumberInput
                                        label="Nombre max de participants"
                                        placeholder="Max participants"
                                        value={courseFormData.maxAttendees}
                                        onChange={(value:any) => setCourseFormData({ ...courseFormData, maxAttendees: Number(value) || 10 })}
                                        min={1}
                                        required
                                    />
                                </Group>
                                <Select
                                    label="Public"
                                    placeholder="Sélectionnez le public"
                                    value={courseFormData.audiance.toString()}
                                    onChange={(value) => setCourseFormData({ ...courseFormData, audiance: parseInt(value || "0") })}
                                    data={[
                                        { value: "0", label: "Élu" },
                                        { value: "1", label: "Président" },
                                    ]}
                                    required
                                />
                                <Group grow>
                                    <TextInput
                                        label="Nom de l'instructeur"
                                        placeholder="Nom"
                                        value={courseFormData.instructorName}
                                        onChange={(e) => setCourseFormData({ ...courseFormData, instructorName: e.currentTarget.value })}
                                        required
                                    />
                                    <TextInput
                                        label="Prénom de l'instructeur"
                                        placeholder="Prénom"
                                        value={courseFormData.instructorSurname}
                                        onChange={(e) => setCourseFormData({ ...courseFormData, instructorSurname: e.currentTarget.value })}
                                        required
                                    />
                                </Group>
                                <Button onClick={handleAddCourse} fullWidth mt="sm">
                                    Ajouter le cours
                                </Button>
                            </>
                        )}

                        <Group justify="flex-end" mt="md">
                            <Button variant="outline" onClick={close}>
                                Annuler
                            </Button>
                            <Button onClick={handleSubmit}>
                                {editingSession ? "Modifier" : "Créer"}
                            </Button>
                        </Group>
                    </Stack>
                </Modal>

                <Modal 
                    opened={participantsOpened} 
                    onClose={closeParticipants} 
                    title={`Participants - ${selectedSession?.shortDescription}`} 
                    size="xl"
                >
                    <Stack>
                        <Title order={3}>Liste des participants</Title>
                        {participants.length === 0 ? (
                            <p>Aucun participant inscrit</p>
                        ) : (
                            <Table striped>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Nom</Table.Th>
                                        <Table.Th>Prénom</Table.Th>
                                        <Table.Th>Email</Table.Th>
                                        <Table.Th>Entreprise</Table.Th>
                                        <Table.Th>Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {participants.map((participant) => (
                                        <Table.Tr key={participant.id}>
                                            <Table.Td>{participant.name}</Table.Td>
                                            <Table.Td>{participant.surname}</Table.Td>
                                            <Table.Td>{participant.email}</Table.Td>
                                            <Table.Td>{participant.company}</Table.Td>
                                            <Table.Td>
                                                <Button 
                                                    size="xs" 
                                                    color="red" 
                                                    onClick={() => handleDeleteParticipant(participant.id)}
                                                >
                                                    Supprimer
                                                </Button>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        )}

                        <Title order={3} mt="xl">Ajouter un participant</Title>
                        <Group grow>
                            <TextInput
                                label="Nom"
                                placeholder="Nom"
                                value={participantFormData.name}
                                onChange={(e) => setParticipantFormData({ ...participantFormData, name: e.currentTarget.value })}
                                required
                            />
                            <TextInput
                                label="Prénom"
                                placeholder="Prénom"
                                value={participantFormData.surname}
                                onChange={(e) => setParticipantFormData({ ...participantFormData, surname: e.currentTarget.value })}
                                required
                            />
                        </Group>
                        <TextInput
                            label="Email"
                            type="email"
                            placeholder="email@example.com"
                            value={participantFormData.email}
                            onChange={(e) => setParticipantFormData({ ...participantFormData, email: e.currentTarget.value })}
                            required
                        />
                        <TextInput
                            label="Entreprise"
                            placeholder="Nom de l'entreprise"
                            value={participantFormData.company}
                            onChange={(e) => setParticipantFormData({ ...participantFormData, company: e.currentTarget.value })}
                            required
                        />
                        <Group justify="flex-end" mt="md">
                            <Button variant="outline" onClick={closeParticipants}>
                                Fermer
                            </Button>
                            <Button onClick={handleAddParticipant}>
                                Ajouter le participant
                            </Button>
                        </Group>
                    </Stack>
                </Modal>
            </Container>
        </MantineProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById("react-app") as HTMLElement);
root.render(<AdminPage />);
