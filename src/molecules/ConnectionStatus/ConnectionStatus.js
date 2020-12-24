import { Box, Text, Grid } from "atoms";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 2500,
    pv: 6400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 4398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 1980,
    pv: 8800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 5800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 5390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 2490,
    pv: 7300,
    amt: 2100,
  },
];

const ConnectionStatusDetail = ({ name, text, color }) => {
  return (
    <Box py=".5rem">
      <Text color="text.500" fontSize="1.3rem" fontWeight="semiBold">
        {name}
      </Text>
      <Text color={color} fontSize="1.3rem" fontWeight="semiBold">
        {text}
      </Text>
    </Box>
  );
};

export const ConnectionStatus = () => {
  return (
    <Box bg="bg.800" position="fixed" bottom={0}>
      <Box py="1rem" borderBottom="1px solid" borderColor="border.600">
        <Text
          color="grey.700"
          fontSize="1.5rem"
          fontWeight="semiBold"
          textAlign="center"
        >
          Connection Status
        </Text>
      </Box>
      <Box textAlign="left" p="1rem 2rem">
        <ConnectionStatusDetail name="Moniker:" text="ABC Node Hosters" />
        <ConnectionStatusDetail name="Current Session:" text="15min 12s" />
        <ConnectionStatusDetail name="Server:" text="Australia (AUS-1)" />
        <ConnectionStatusDetail name="IP Address:" text="154.154.2.1" />
      </Box>
      <Grid
        gridTemplateColumns="1fr 1fr"
        justifyContent="space-around"
        pb="1rem"
      >
        <Box
          borderRight="1px solid"
          borderColor="border.600"
          textAlign="center"
        >
          <ConnectionStatusDetail
            name="Up Speed"
            text="540.25 Mbps"
            color="warning.500"
          />
        </Box>
        <Box>
          <ConnectionStatusDetail
            name="Down Speed"
            text="527.25 Mbps"
            color="primary.500"
          />
        </Box>
      </Grid>
      <Box>
        <div style={{ width: "23rem", height: "12rem" }}>
          <ResponsiveContainer>
            <LineChart
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              {/* <Tooltip /> */}
              {/* <Legend /> */}
              <Line type="monotone" dataKey="pv" stroke="#129EED" />
              <Line type="monotone" dataKey="uv" stroke="#E3814A" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Box>
    </Box>
  );
};

ConnectionStatusDetail.defaultProps = {
  color: "text.600",
};
