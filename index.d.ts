declare module 'UserAvatar' {
    import { StyleProp, ViewStyle } from "react-native";

    export interface UserAvatarProps {
        src: string;
        name: string;
        color: string;
        textColor: string;
        colors: any;
        fontDecrease: string,
        size: number,
        containerStyle: ViewStyle,
        imageStyle: string,
        defaultName: string,
        radius: number;
    }
}