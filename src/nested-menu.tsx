import React from "react";
import {
    Menu as ChakraMenu,
    MenuItem as ChakraMenuItem,
    MenuItemProps,
    MenuProps,
    useMenuContext,
    useMenuDescendants,
    useMenuDescendantsContext
} from "@chakra-ui/react";

console.clear();

type NestedMenuContextProps = ReturnType<typeof useMenuContext>;
export const NestedMenuContext = React.createContext<NestedMenuContextProps | undefined>(undefined);

export const Menu = React.forwardRef<HTMLButtonElement, MenuProps>(
    (props, ref) => {

        const nestedMenuContext = React.useContext(NestedMenuContext);
        const parentMenuContext = useMenuContext();
        // console.log('nestedMenuContext =>', nestedMenuContext)
        // console.log('parentMenuContext =>', parentMenuContext)
        // console.log('=================================')
        // console.log('ref =>', ref)

        // parentMenuContext.menuRef = (a) => {
        //     console.log('a')
        // }
        return (
            <NestedMenuContext.Provider
                value={{
                    ...parentMenuContext,
                    onClose: () => {
                        nestedMenuContext?.onClose();
                        parentMenuContext?.onClose();
                    }
                }}
            >
                <ChakraMenu {...props} />
            </NestedMenuContext.Provider>
        );
    }
);

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
    (props, ref) => {
        const {onClose, closeOnSelect} =
        React.useContext(NestedMenuContext) || {};
        const {onClick} = props;

        const handleClick = (event: any) => {
            console.log('aaa=>', event)
            closeOnSelect && onClose?.();
            onClick?.(event);
        };
        //console.log('ref!! =>', ref)
        return <ChakraMenuItem ref={ref} {...props} onClick={handleClick}/>;
    }
);

export const NestedMenu = React.forwardRef<HTMLButtonElement, MenuItemProps>(
    (props, ref) => {
        // console.log('NestedMenu REF =>', ref)
        // const innerRef = React.useRef<HTMLButtonElement | null>(null)
        // const keyDownHandler = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        //     console.log('EEE =>', e)
        // }

        const nestedMenuContext = React.useContext(NestedMenuContext)
        const parentMenuContext = useMenuContext()
        const {openAndFocusFirstItem, onClose, focusedIndex, setFocusedIndex} = parentMenuContext
        // const descendants = useMenuDescendants()
        const descendants = useMenuDescendantsContext()
        const customKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
            props.onKeyDown?.(event);

            if (nestedMenuContext) {
                // const {focusedIndex, setFocusedIndex} = nestedMenuContext
                const map = {
                    //ESC
                    27: () => {
                        onClose()
                    },
                    // LEFT
                    37: () => {
                    },
                    // RIGHT
                    39: () => {
                    },
                    // UP
                    38: () => {
                        const prev = descendants.prevEnabled(focusedIndex)
                        if (prev) setFocusedIndex(prev.index)
                    },
                    // DOWN
                    40: () => {
                        const next = descendants.nextEnabled(focusedIndex)
                        if (next) setFocusedIndex(next.index)
                    }
                }

                // @ts-ignore
                map[event.keyCode]?.()
                event.defaultPrevented = true;
            }
        }


        return <ChakraMenuItem
            onKeyDownCapture={(e) => {
                console.log('capture ---e--->', e)
                e.stopPropagation()
                customKeyDown(e)
                // e.preventDefault()
            }}
            closeOnSelect={false}
            {...props}
        />;
    }
);
