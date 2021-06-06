import {Box, Button, ChakraProvider, MenuButton, MenuList, useMenuContext, useMenuDescendantsContext} from "@chakra-ui/react";
import * as React from "react";
import {render} from "react-dom";

import {Menu, MenuItem, NestedMenu, NestedMenuContext} from "./nested-menu";
import "./styles.css";

const CePizdosMenu = React.forwardRef<HTMLButtonElement, {}>((props, ref) => (
    <Menu placement="right-start">
        <MenuButton ref={ref} {...props}>
            Ce pizdos
        </MenuButton>
        <MenuList>
            <MenuItem
                onClick={() => {
                    console.log("chiki briki");
                }}
            >
                chiki briki
            </MenuItem>
        </MenuList>
    </Menu>
));

const KurwaMenu = React.forwardRef<HTMLButtonElement, {}>((props, ref) => (
    <Menu placement="right-start">
        <MenuButton ref={ref} {...props}>
            Kurwa
        </MenuButton>
        <MenuList>
            <MenuItem
                onClick={() => {
                    console.log("Pen'onsi");
                }}
            >
                Pen'onsi
            </MenuItem>
            <NestedMenu as={CePizdosMenu}/>
        </MenuList>
    </Menu>
));

const OtherNetworks = React.forwardRef<HTMLButtonElement, {}>((props, ref) => (
    <Menu placement="right-start">
        <MenuButton ref={ref} {...props}>
            Other
        </MenuButton>
        <MenuList>
            <MenuItem
                onClick={() => {
                    console.log("twitch");
                }}
            >
                Twitch
            </MenuItem>
            <MenuItem>Pinterest</MenuItem>
        </MenuList>
    </Menu>
));

const NetworksMenu = React.forwardRef<HTMLButtonElement, {}>((props, ref) => {
    const keyDownHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        console.log('WithMenu EEE =>', e)
    }

    return (
        <Menu placement="right-start">
            <MenuButton ref={ref} onKeyDown={keyDownHandler}  {...props}>
                Other Networks
            </MenuButton>
            <MenuList>
                <MenuItem>Twitter</MenuItem>
                <MenuItem
                    onClick={() => {
                        console.log("facebook");
                    }}
                >
                    Facebook
                </MenuItem>
                <NestedMenu as={OtherNetworks}/>
                <NestedMenu as={KurwaMenu}/>
            </MenuList>
        </Menu>
    );
});

export const WithMenu = () => {
    const nestedMenuContext = React.useContext(NestedMenuContext)
    // const { openAndFocusFirstItem, onClose } = useMenuContext()
    // const descendants = useMenuDescendantsContext()

    return (
        <Menu>
            <MenuButton as={Button} size="sm" colorScheme="teal">
                Open menu
            </MenuButton>
            <MenuList
                // onKeyDownCapture={(e) => {
                //     console.log('capture ---e--->', e)
                //     // e.stopPropagation()
                //     e.preventDefault()
                // }}
                // onKeyDown={(e) => {
                //
                // }}
            >
                <NestedMenu as={NetworksMenu}/>
                <MenuItem command="⌘T" onClick={() => console.log("newTab")}>
                    New Tab
                </MenuItem>
                <MenuItem command="⌘N">New Window</MenuItem>
                <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
                <MenuItem command="⌘O">Open File...</MenuItem>
            </MenuList>
        </Menu>
    )
};

function App() {
    return (
        <Box h="100%">
            <WithMenu/>
        </Box>
    );
}

const rootElement = document.getElementById("root");
render(
    <ChakraProvider>
        <App/>
    </ChakraProvider>,
    rootElement
);
