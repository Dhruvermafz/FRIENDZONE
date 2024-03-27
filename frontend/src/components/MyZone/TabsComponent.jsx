import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

const TabsComponent = () => {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="5">
        <Tab>Popular</Tab>
        <Tab>Most Members</Tab>
        <Tab>Suggested Groups</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text>Content for popular tab</Text>
        </TabPanel>
        <TabPanel>
          <Text>Content for most-member tab</Text>
        </TabPanel>
        <TabPanel>
          <Text>Content for suggested-group tab</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;
