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
    <Alert status="info" backgroundColor={statusColors[status]} variant="solid" borderRadius="md" p={4} justifyContent="center" textAlign="center">
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
      <Box p={5} shadow="xl" borderWidth="1px" borderRadius="lg" bgGradient="linear(to-br, blue.100, blue.50)" key={component.name}>
        <Heading fontSize="xl">{component.name}</Heading>
        <Text mt={4}>{component.description}</Text>
        <Text fontSize="sm" color="gray.500">
          How this might affect you: {component.userImpact}
        </Text>
        <ComponentStatusIcon status={component.status} />
      </Box>
    ))}
  </Grid>
);

const IncidentHistory = ({ incidents }) => (
  <VStack align="stretch" spacing={4}>
    {incidents.map((incident) => (
      <Box p={5} shadow="md" borderWidth="1px" bg="gray.100" borderRadius="lg" key={incident.timestamp}>
        <Text fontWeight="bold">{incident.timestamp}</Text>
        <Text color={incident.status === "resolved" ? "green.500" : "red.500"}>{incident.description}</Text>
        {incident.estimatedResolution && (
          <Text fontSize="sm" color="gray.500">
            Estimated resolution time: {incident.estimatedResolution}
          </Text>
        )}
      </Box>
    ))}
  </VStack>
);

const Index = () => {
  const systemStatus = "minor"; // This should be dynamic based on actual system status
  const components = [
    { name: "Core Posting", description: "Limited image uploads.", status: "minor", userImpact: "You might experience slower or failed image uploads." },
    { name: "Messaging", description: "Potential message delays.", status: "operational", userImpact: "Messages may be delivered with slight delays." },
    { name: "Search", description: "Search is fully operational.", status: "operational", userImpact: "You should be able to search without any issues." },
    { name: "API/Developer Tools", description: "API slowness.", status: "partial", userImpact: "Developers might notice increased response times from APIs." },
  ];
  const incidents = [
    { timestamp: "2023-04-01 10:00 UTC", description: "Image upload issues ongoing. We are working hard to resolve this as quickly as possible.", status: "ongoing", estimatedResolution: "2023-04-02 18:00 UTC" },
    { timestamp: "2023-04-01 09:00 UTC", description: "API latency issues have been resolved. Thank you for your patience.", status: "resolved" },
  ];

  return (
    <Box p={5}>
      <SystemStatusBanner status={systemStatus} />
      <Heading my={8} fontSize="3xl" color="gray.700">
        System Components
      </Heading>
      <ComponentGrid components={components} />
      <Heading my={6}>Incident History</Heading>
      <IncidentHistory incidents={incidents} />
      <Box my={6}>
        <Heading size="md">Subscribe to Updates</Heading>
        <Button leftIcon={<FaBell />} colorScheme="blue" mt={3} borderRadius="full" _hover={{ transform: "scale(1.05)" }}>
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
        <Link href="https://community.verbatim.com/forum" isExternal _hover={{ textDecoration: "none" }}>
          <Button leftIcon={<FaRegCommentDots />} colorScheme="teal" mt={3} borderRadius="full" _hover={{ transform: "scale(1.05)" }}>
            Visit Our Community Forum
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Index;
