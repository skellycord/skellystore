import { React, megaModule } from "@skellycord/webpack/common";

export default function DummySection() {
    // testToast

    const { Card, Text } = megaModule;
    return <Card>
        <Text variant="heading-md/normal">Heading</Text>
        <Text>Description</Text>
    </Card>;
}