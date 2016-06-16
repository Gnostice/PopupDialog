/// <reference path="../typings/jquery/jquery.d.ts" />
declare module gnostice {
    /**
     * Defines pre-defined positions for popUpBox
     */
    enum Position {
        TOPLEFT = 0,
        TOPRIGHT = 1,
        BOTTOMLEFT = 2,
        BOTTOMRIGHT = 3,
        CENTER = 4,
    }
    /**
     * popUpBox to provide popup box on any HTML element
     */
    class popUpBox {
        popUpPlaceholder: any;
        overlayHTMLElement: any;
        parentHTMLElement: any;
        height: number;
        width: number;
        closePopUp: Function;
        constructor(placeholder: any, overlay?: boolean);
        /**
        * Show popUpBox
        * @param position To set the absolute predefined positions.
        */
        show(position?: Position): void;
        /**
        * Show popUpBox
        * @param sleep A string or a number determining how log the hiding transition proceed.
        */
        hide(sleep?: number): void;
    }
    class MessageBox extends popUpBox {
        messageBoxHTMLElement: any;
        overlayHTMLElement: any;
        parentHTMLElement: any;
        constructor(placeholder: any, message: string, overlay?: boolean);
        protected addClass(className: string): void;
    }
    /**
     * WarningMessageBox to show warning messages in popUpBox
     */
    class WarningMessageBox extends MessageBox {
        constructor(placeholder: any, message: string, overlay?: boolean);
    }
    /**
     * InfoMessageBox to show info messages in popUpBox
     */
    class InfoMessageBox extends MessageBox {
        constructor(placeholder: any, message: string, overlay?: boolean);
    }
    /**
     * SuccessMessageBox to show success messages in popUpBox
     */
    class SuccessMessageBox extends MessageBox {
        constructor(placeholder: any, message: string, overlay?: boolean);
    }
    /**
     * ErrorMessageBox to show error messages in popUpBox
     */
    class ErrorMessageBox extends MessageBox {
        constructor(placeholder: any, message: string, overlay?: boolean);
    }
    /**
     * progressPopUpBox to show progress bar in popUpBox
     */
    class progressPopUpBox extends popUpBox {
        maximum: number;
        minimum: number;
        myBar: any;
        label: any;
        cancelTask: Function;
        constructor(placeholder: any, overlay?: boolean);
        /**
         * To set maximum steps to progress.
         * @param maxVal A number to set maximum value for progress.
         */
        setMaximum(maxVal: number): void;
        /**
         * To set minVal to start the progress with.
         * @param minVal A number to set minimum value for progress.
         */
        setMinimum(minVal: number): void;
        /**
         * To stop the progress by hidding popUpBox.
         */
        progressCompleted(): void;
        /**
         * To set progress in progresBar with value.
         * @param value A number to set value for progress bar.
         */
        private setValue(value);
    }
}
