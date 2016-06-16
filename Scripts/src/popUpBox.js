/// <reference path="../typings/jquery/jquery.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gnostice;
(function (gnostice) {
    /**
     * Defines pre-defined positions for popUpBox
     */
    (function (Position) {
        Position[Position["TOPLEFT"] = 0] = "TOPLEFT";
        Position[Position["TOPRIGHT"] = 1] = "TOPRIGHT";
        Position[Position["BOTTOMLEFT"] = 2] = "BOTTOMLEFT";
        Position[Position["BOTTOMRIGHT"] = 3] = "BOTTOMRIGHT";
        Position[Position["CENTER"] = 4] = "CENTER";
    })(gnostice.Position || (gnostice.Position = {}));
    var Position = gnostice.Position;
    /**
     * popUpBox to provide popup box on any HTML element
     */
    var popUpBox = (function () {
        function popUpBox(placeholder, overlay) {
            if (overlay === void 0) { overlay = true; }
            this.parentHTMLElement = placeholder;
            if (overlay) {
                if ($(this.parentHTMLElement).children().filter("div.git-popUpBox-overlay").length > 0) {
                    this.overlayHTMLElement = $(this.parentHTMLElement).children().filter("div.git-popUpBox-overlay");
                }
                else {
                    this.overlayHTMLElement = document.createElement("div");
                    $(this.overlayHTMLElement).attr({ "class": "git-popUpBox-overlay" });
                    $(this.parentHTMLElement).append(this.overlayHTMLElement);
                }
            }
            if ($(this.parentHTMLElement).children().filter("div.git-popUpBox-popupbox").length > 0) {
                this.popUpPlaceholder = $(this.parentHTMLElement).children().filter("div.git-popUpBox-popupbox");
                $(this.popUpPlaceholder).css("position", "absolute");
                $(this.popUpPlaceholder).empty();
                $(this.popUpPlaceholder).removeAttr("class");
                $(this.popUpPlaceholder).addClass("git-popUpBox-popupbox");
            }
            else {
                this.popUpPlaceholder = document.createElement("div");
                $(this.popUpPlaceholder).css("position", "absolute");
                $(this.popUpPlaceholder).addClass("git-popUpBox-popupbox");
            }
            var closeHTMLElement = document.createElement("span");
            $(closeHTMLElement).attr("style", "display:block; position:absolute; top:3px; right:2px; color:black; height:17px; width:17px; text-decoration:none; text-align:center; font-weight:bold; cursor: pointer;");
            var _this = this;
            $(closeHTMLElement).on("click", function () {
                this.parentElement.style.display = 'none';
                $(_this.popUpPlaceholder).hide();
                if (overlay) {
                    $(_this.overlayHTMLElement).hide();
                }
                if (_this.closePopUp != null) {
                    _this.closePopUp();
                }
            });
            $(closeHTMLElement).append("&times;");
            $(this.popUpPlaceholder).append(closeHTMLElement);
            $(this.parentHTMLElement).append(this.popUpPlaceholder);
        }
        /**
        * Show popUpBox
        * @param position To set the absolute predefined positions.
        */
        popUpBox.prototype.show = function (position) {
            switch (position) {
                case Position.BOTTOMLEFT:
                    $(this.popUpPlaceholder).css({ "left": "5px", "right": "", "top": "", "bottom": "5px" });
                    break;
                case Position.BOTTOMRIGHT:
                    $(this.popUpPlaceholder).css({ "left": "", "right": "5px", "top": "", "bottom": "5px" });
                    break;
                case Position.TOPLEFT:
                    $(this.popUpPlaceholder).css({ "left": "5px", "right": "", "top": "5px", "bottom": "" });
                    break;
                case Position.TOPRIGHT:
                    $(this.popUpPlaceholder).css({ "left": "", "right": "5px", "top": "5px", "bottom": "" });
                    break;
                case Position.CENTER:
                    $(this.popUpPlaceholder).addClass("git-popUpBox-messagebox-center");
                    var messageBoxTop = ($(this.parentHTMLElement).height() - $(this.popUpPlaceholder).outerHeight()) * 0.5;
                    var messageBoxLeft = ($(this.parentHTMLElement).width() - $(this.popUpPlaceholder).outerWidth()) * 0.5;
                    $(this.popUpPlaceholder).css({ "left": messageBoxLeft, "right": "", "top": messageBoxTop, "bottom": "" });
                    break;
                default:
                    $(this.popUpPlaceholder).addClass("git-popUpBox-messagebox-center");
                    var messageBoxTop = ($(this.parentHTMLElement).height() - $(this.popUpPlaceholder).outerHeight()) * 0.5;
                    var messageBoxLeft = ($(this.parentHTMLElement).width() - $(this.popUpPlaceholder).outerWidth()) * 0.5;
                    $(this.popUpPlaceholder).css({ "left": messageBoxLeft, "right": "", "top": messageBoxTop, "bottom": "" });
                    break;
            }
            $(this.overlayHTMLElement).show();
            $(this.popUpPlaceholder).show();
        };
        /**
        * Show popUpBox
        * @param sleep A string or a number determining how log the hiding transition proceed.
        */
        popUpBox.prototype.hide = function (sleep) {
            if (sleep != null) {
                $(this.overlayHTMLElement).hide();
                $(this.popUpPlaceholder).fadeOut(sleep);
            }
            else {
                $(this.overlayHTMLElement).hide();
                $(this.popUpPlaceholder).hide();
            }
        };
        return popUpBox;
    }());
    gnostice.popUpBox = popUpBox;
    var MessageBox = (function (_super) {
        __extends(MessageBox, _super);
        function MessageBox(placeholder, message, overlay) {
            if (overlay === void 0) { overlay = true; }
            _super.call(this, placeholder, overlay);
            if ($(this.popUpPlaceholder).children().filter("div.git-popUpBox-messagebox").length > 0) {
                this.messageBoxHTMLElement = $(this.popUpPlaceholder).children().filter("div.git-popUpBox-messagebox");
                $(this.messageBoxHTMLElement).empty();
            }
            else {
                this.messageBoxHTMLElement = document.createElement("div");
                $(this.messageBoxHTMLElement).addClass("git-popUpBox-messagebox");
            }
            $(this.messageBoxHTMLElement).html("<span>" + message + "</span>");
            $(this.popUpPlaceholder).append(this.messageBoxHTMLElement);
        }
        MessageBox.prototype.addClass = function (className) {
            $(this.messageBoxHTMLElement).addClass(className);
        };
        return MessageBox;
    }(popUpBox));
    gnostice.MessageBox = MessageBox;
    /**
     * WarningMessageBox to show warning messages in popUpBox
     */
    var WarningMessageBox = (function (_super) {
        __extends(WarningMessageBox, _super);
        function WarningMessageBox(placeholder, message, overlay) {
            if (overlay === void 0) { overlay = true; }
            _super.call(this, placeholder, message, overlay);
            _super.prototype.addClass.call(this, "git-popUpBox-warning");
            $(this.popUpPlaceholder).addClass("git-popUpBox-warning-color");
        }
        return WarningMessageBox;
    }(MessageBox));
    gnostice.WarningMessageBox = WarningMessageBox;
    /**
     * InfoMessageBox to show info messages in popUpBox
     */
    var InfoMessageBox = (function (_super) {
        __extends(InfoMessageBox, _super);
        function InfoMessageBox(placeholder, message, overlay) {
            if (overlay === void 0) { overlay = true; }
            _super.call(this, placeholder, message, overlay);
            _super.prototype.addClass.call(this, "git-popUpBox-info");
            $(this.popUpPlaceholder).addClass("git-popUpBox-info-color");
        }
        return InfoMessageBox;
    }(MessageBox));
    gnostice.InfoMessageBox = InfoMessageBox;
    /**
     * SuccessMessageBox to show success messages in popUpBox
     */
    var SuccessMessageBox = (function (_super) {
        __extends(SuccessMessageBox, _super);
        function SuccessMessageBox(placeholder, message, overlay) {
            if (overlay === void 0) { overlay = true; }
            _super.call(this, placeholder, message, overlay);
            _super.prototype.addClass.call(this, "git-popUpBox-success");
            $(this.popUpPlaceholder).addClass("git-popUpBox-success-color");
        }
        return SuccessMessageBox;
    }(MessageBox));
    gnostice.SuccessMessageBox = SuccessMessageBox;
    /**
     * ErrorMessageBox to show error messages in popUpBox
     */
    var ErrorMessageBox = (function (_super) {
        __extends(ErrorMessageBox, _super);
        function ErrorMessageBox(placeholder, message, overlay) {
            if (overlay === void 0) { overlay = true; }
            _super.call(this, placeholder, message, overlay);
            _super.prototype.addClass.call(this, "git-popUpBox-error");
            $(this.popUpPlaceholder).addClass("git-popUpBox-error-color");
        }
        return ErrorMessageBox;
    }(MessageBox));
    gnostice.ErrorMessageBox = ErrorMessageBox;
    /**
     * progressPopUpBox to show progress bar in popUpBox
     */
    var ProgressPopUpBox = (function (_super) {
        __extends(ProgressPopUpBox, _super);
        function ProgressPopUpBox(placeholder, overlay) {
            if (overlay === void 0) { overlay = true; }
            _super.call(this, placeholder, overlay);
            var progressBarHeader = document.createElement("div");
            $(progressBarHeader).html("Preparing print pages");
            $(progressBarHeader).addClass("git-popUpBox-popupbox-message");
            $(this.popUpPlaceholder).append(progressBarHeader);
            var myprogress = document.createElement("div");
            $(myprogress).css({
                "position": "relative",
                "width": "100 %",
                "height": "30px",
                "background-color": "#ddd",
                "margin": "8px 0px 8px 0px"
            });
            this.myBar = document.createElement("div");
            $(this.myBar).css({
                "position": "absolute",
                "width": "0%",
                "height": "100% ",
                "background-color": "#4CAF50"
            });
            this.label = document.createElement("div");
            $(this.label).css({
                "text-align": "center",
                "line-height": "30px",
                "color": "white"
            });
            $(this.label).html("0%");
            $(this.myBar).append(this.label);
            $(myprogress).append(this.myBar);
            var _this = this;
            var cancelButton = document.createElement("input");
            $(cancelButton).attr("type", "submit");
            $(cancelButton).addClass("git-popUpBox-popupbox-cancel");
            $(cancelButton).on("click", function () {
                _this.hide();
                if (_this.cancelTask != null) {
                    _this.cancelTask();
                }
                return false;
            });
            $(cancelButton).val("Cancel");
            $(this.popUpPlaceholder).width(250);
            $(this.popUpPlaceholder).append(myprogress);
            $(this.popUpPlaceholder).append(cancelButton);
            $(this.popUpPlaceholder).addClass("git-popUpBox-popupbox-message-color");
        }
        /**
         * To set maximum steps to progress.
         * @param maxVal A number to set maximum value for progress.
         */
        ProgressPopUpBox.prototype.setMaximum = function (maxVal) {
            this.maximum = maxVal;
        };
        /**
         * To set minVal to start the progress with.
         * @param minVal A number to set minimum value for progress.
         */
        ProgressPopUpBox.prototype.setMinimum = function (minVal) {
            this.minimum = minVal;
        };
        /**
         * To stop the progress by hidding popUpBox.
         */
        ProgressPopUpBox.prototype.progressCompleted = function () {
            _super.prototype.hide.call(this);
        };
        /**
         * To set progress in progresBar with value.
         * @param value A number to set value for progress bar.
         */
        ProgressPopUpBox.prototype.setValue = function (value) {
            var percentageValue;
            if (value <= this.maximum) {
                var percentageString = (value * 100) / this.maximum;
                percentageValue = parseInt(percentageString.toString());
            }
            else {
                percentageValue = 100;
            }
            $(this.label).html(percentageValue + "%");
            $(this.myBar).width(percentageValue + "%");
            if (percentageString == 100) {
                this.progressCompleted();
            }
        };
        return ProgressPopUpBox;
    }(popUpBox));
    gnostice.ProgressPopUpBox = ProgressPopUpBox;
})(gnostice || (gnostice = {}));
