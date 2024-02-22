// Verbatim System Status Page
import { Box, Grid, Heading, Text, VStack, Button, Icon, Alert, AlertIcon, AlertTitle, AlertDescription, Link } from "@chakra-ui/react";
import { FaCheckCircle, FaExclamationTriangle, FaExclamationCircle, FaBell, FaRegCommentDots } from "react-icons/fa";

const SystemStatusBanner = ({ status }) => {
  const statusColors = {
    operational: "green.500",
    minor: "yellow.400",
    partial: "orange.500",
    critical: "red.500",
  };

  const statusText = {
    operational: "All Systems Operational",
    minor: "Minor Disruption",
    partial: "Partial Service Outage",
    critical: "Critical Outage",
  };

  return (
    <Alert status="info" backgroundColor={statusColors[status]} variant="solid">
      <AlertIcon as={status === "operational" ? FaCheckCircle : FaExclamationTriangle} />
      <AlertTitle mr={2}>{statusText[status]}</AlertTitle>
    </Alert>
  );
};

const ComponentStatusIcon = ({ status }) => {
  const iconMap = {
    operational: FaCheckCircle,
    minor: FaExclamationTriangle,
    partial: FaExclamationCircle,
    critical: FaExclamationCircle,
  };
  const colorMap = {
    operational: "green.500",
    minor: "yellow.400",
    partial: "orange.500",
    critical: "red.500",
  };
  const IconComponent = iconMap[status];
  return <Icon as={IconComponent} color={colorMap[status]} />;
};

const ComponentGrid = ({ components }) => (
  <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
    {components.map((component) => (
      <Box p={5} shadow="md" borderWidth="1px" key={component.name}>
        <Heading fontSize="xl">{component.name}</Heading>
        <Text mt={4}>{component.description}</Text>
        <ComponentStatusIcon status={component.status} />
      </Box>
    ))}
  </Grid>
);

const IncidentHistory = ({ incidents }) => (
  <VStack align="stretch" spacing={4}>
    {incidents.map((incident) => (
      <Box p={4} shadow="md" borderWidth="1px" key={incident.timestamp}>
        <Text fontWeight="bold">{incident.timestamp}</Text>
        <Text color={incident.status === "resolved" ? "green.500" : "red.500"}>{incident.description}</Text>
      </Box>
    ))}
  </VStack>
);

const Index = () => {
  const systemStatus = "minor"; // This should be dynamic based on actual system status
  const components = [
    { name: "Core Posting", description: "Limited image uploads until resolution.", status: "minor" },
    { name: "Messaging", description: "Sending and receiving messages might be delayed.", status: "operational" },
    { name: "Search", description: "Search functionality is operating normally.", status: "operational" },
    { name: "API/Developer Tools", description: "API responses may be slow.", status: "partial" },
  ];
  const incidents = [
    { timestamp: "2023-04-01 10:00 UTC", description: "Issue with image uploads identified.", status: "ongoing" },
    { timestamp: "2023-04-01 09:00 UTC", description: "API latency issues reported.", status: "resolved" },
  ];

  return (
    <Box p={5}>
      <SystemStatusBanner status={systemStatus} />
      <Heading my={6}>System Components</Heading>
      <ComponentGrid components={components} />
      <Heading my={6}>Incident History</Heading>
      <IncidentHistory incidents={incidents} />
      <Box my={6}>
        <Heading size="md">Subscribe to Updates</Heading>
        <Button leftIcon={<FaBell />} colorScheme="blue" mt={3}>
          Email Alerts
        </Button>
        <Button leftIcon={<FaBell />} colorScheme="blue" mt={3} ml={3}>
          Text Alerts
        </Button>
        <Button leftIcon={<FaBell />} colorScheme="blue" mt={3} ml={3}>
          Push Notifications
        </Button>
      </Box>
      <Box my={6}>
        <Heading size="md">Need Help?</Heading>
        <Link href="https://community.verbatim.com/forum" isExternal>
          <Button leftIcon={<FaRegCommentDots />} colorScheme="teal" mt={3}>
            Visit Our Community Forum
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Index;
