/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/Customer/i18n/i18n.properties":
/*!*********************************************************!*\
  !*** ./build.definitions/Customer/i18n/i18n.properties ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/Customer/Rules/Application/AppUpdateFailure.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Application/AppUpdateFailure.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/Customer/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Application/AppUpdateSuccess.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Application/AppUpdateSuccess.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/Customer/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/Customer/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Application/ClientIsMultiUserMode.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Application/ClientIsMultiUserMode.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Application/GetClientSupportVersions.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Application/GetClientSupportVersions.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Application/GetClientVersion.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Application/GetClientVersion.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Application/OnWillUpdate.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Application/OnWillUpdate.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/Customer/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/Customer/Actions/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Application/ResetAppSettingsAndLogout.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/Customer/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/EmailValidation.js":
/*!*************************************************************!*\
  !*** ./build.definitions/Customer/Rules/EmailValidation.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EmailValidation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function EmailValidation(clientAPI) {
     //The following evaluateTargetPath will retrieve the current value of the email control
     if ((clientAPI.evaluateTargetPath('#Control:FCEmail/#Value').indexOf('@')) === -1) {
        //If email value does not contain @ display a validation failure message to the end-user
        clientAPI.executeAction('/Customer/Actions/ValidationFailure.action');
    } else {
        //If @ is present in the email value, return true to indicate validation is successful
        return true;
    }
}


/***/ }),

/***/ "./build.definitions/Customer/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Customer/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
    context.count('/Customer/Services/SampleServiceV4.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/Customer/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function() {
                return Promise.reject(false);
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Logging/LogLevels.js":
/*!***************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Logging/LogLevels.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Logging/SetTraceCategories.js":
/*!************************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Logging/SetTraceCategories.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Logging/SetUserLogLevel.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Logging/SetUserLogLevel.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Logging/ToggleLogging.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Logging/ToggleLogging.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Logging/TraceCategories.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Logging/TraceCategories.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/Customer/Rules/Logging/UserLogSetting.js":
/*!********************************************************************!*\
  !*** ./build.definitions/Customer/Rules/Logging/UserLogSetting.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let customer_actions_application_appupdate_action = __webpack_require__(/*! ./Customer/Actions/Application/AppUpdate.action */ "./build.definitions/Customer/Actions/Application/AppUpdate.action")
let customer_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./Customer/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/Customer/Actions/Application/AppUpdateFailureMessage.action")
let customer_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./Customer/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/Customer/Actions/Application/AppUpdateProgressBanner.action")
let customer_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./Customer/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/Customer/Actions/Application/AppUpdateSuccessMessage.action")
let customer_actions_application_logout_action = __webpack_require__(/*! ./Customer/Actions/Application/Logout.action */ "./build.definitions/Customer/Actions/Application/Logout.action")
let customer_actions_application_navtoabout_action = __webpack_require__(/*! ./Customer/Actions/Application/NavToAbout.action */ "./build.definitions/Customer/Actions/Application/NavToAbout.action")
let customer_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./Customer/Actions/Application/NavToActivityLog.action */ "./build.definitions/Customer/Actions/Application/NavToActivityLog.action")
let customer_actions_application_navtosupport_action = __webpack_require__(/*! ./Customer/Actions/Application/NavToSupport.action */ "./build.definitions/Customer/Actions/Application/NavToSupport.action")
let customer_actions_application_onwillupdate_action = __webpack_require__(/*! ./Customer/Actions/Application/OnWillUpdate.action */ "./build.definitions/Customer/Actions/Application/OnWillUpdate.action")
let customer_actions_application_reset_action = __webpack_require__(/*! ./Customer/Actions/Application/Reset.action */ "./build.definitions/Customer/Actions/Application/Reset.action")
let customer_actions_application_resetmessage_action = __webpack_require__(/*! ./Customer/Actions/Application/ResetMessage.action */ "./build.definitions/Customer/Actions/Application/ResetMessage.action")
let customer_actions_application_usermenupopover_action = __webpack_require__(/*! ./Customer/Actions/Application/UserMenuPopover.action */ "./build.definitions/Customer/Actions/Application/UserMenuPopover.action")
let customer_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./Customer/Actions/CloseModalPage_Cancel.action */ "./build.definitions/Customer/Actions/CloseModalPage_Cancel.action")
let customer_actions_closemodalpage_complete_action = __webpack_require__(/*! ./Customer/Actions/CloseModalPage_Complete.action */ "./build.definitions/Customer/Actions/CloseModalPage_Complete.action")
let customer_actions_closepage_action = __webpack_require__(/*! ./Customer/Actions/ClosePage.action */ "./build.definitions/Customer/Actions/ClosePage.action")
let customer_actions_customers_updateentity_action = __webpack_require__(/*! ./Customer/Actions/Customers_UpdateEntity.action */ "./build.definitions/Customer/Actions/Customers_UpdateEntity.action")
let customer_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./Customer/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/Customer/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let customer_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./Customer/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/Customer/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let customer_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./Customer/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/Customer/Actions/ErrorArchive/NavToErrorArchive_List.action")
let customer_actions_genericbannermessage_action = __webpack_require__(/*! ./Customer/Actions/GenericBannerMessage.action */ "./build.definitions/Customer/Actions/GenericBannerMessage.action")
let customer_actions_genericmessagebox_action = __webpack_require__(/*! ./Customer/Actions/GenericMessageBox.action */ "./build.definitions/Customer/Actions/GenericMessageBox.action")
let customer_actions_genericnavigation_action = __webpack_require__(/*! ./Customer/Actions/GenericNavigation.action */ "./build.definitions/Customer/Actions/GenericNavigation.action")
let customer_actions_generictoastmessage_action = __webpack_require__(/*! ./Customer/Actions/GenericToastMessage.action */ "./build.definitions/Customer/Actions/GenericToastMessage.action")
let customer_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./Customer/Actions/Logging/LogUploadFailure.action */ "./build.definitions/Customer/Actions/Logging/LogUploadFailure.action")
let customer_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./Customer/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/Customer/Actions/Logging/LogUploadSuccessful.action")
let customer_actions_logging_uploadlog_action = __webpack_require__(/*! ./Customer/Actions/Logging/UploadLog.action */ "./build.definitions/Customer/Actions/Logging/UploadLog.action")
let customer_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./Customer/Actions/Logging/UploadLogProgress.action */ "./build.definitions/Customer/Actions/Logging/UploadLogProgress.action")
let customer_actions_navtocustomers_detail_action = __webpack_require__(/*! ./Customer/Actions/NavToCustomers_Detail.action */ "./build.definitions/Customer/Actions/NavToCustomers_Detail.action")
let customer_actions_navtocustomers_edit_action = __webpack_require__(/*! ./Customer/Actions/NavToCustomers_Edit.action */ "./build.definitions/Customer/Actions/NavToCustomers_Edit.action")
let customer_actions_navtocustomers_list_action = __webpack_require__(/*! ./Customer/Actions/NavToCustomers_List.action */ "./build.definitions/Customer/Actions/NavToCustomers_List.action")
let customer_actions_service_closeoffline_action = __webpack_require__(/*! ./Customer/Actions/Service/CloseOffline.action */ "./build.definitions/Customer/Actions/Service/CloseOffline.action")
let customer_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./Customer/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/Customer/Actions/Service/CloseOfflineFailureMessage.action")
let customer_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./Customer/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/Customer/Actions/Service/CloseOfflineSuccessMessage.action")
let customer_actions_service_downloadoffline_action = __webpack_require__(/*! ./Customer/Actions/Service/DownloadOffline.action */ "./build.definitions/Customer/Actions/Service/DownloadOffline.action")
let customer_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./Customer/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/Customer/Actions/Service/DownloadStartedMessage.action")
let customer_actions_service_initializeoffline_action = __webpack_require__(/*! ./Customer/Actions/Service/InitializeOffline.action */ "./build.definitions/Customer/Actions/Service/InitializeOffline.action")
let customer_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./Customer/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/Customer/Actions/Service/InitializeOfflineFailureMessage.action")
let customer_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./Customer/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/Customer/Actions/Service/InitializeOfflineSuccessMessage.action")
let customer_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./Customer/Actions/Service/SyncFailureMessage.action */ "./build.definitions/Customer/Actions/Service/SyncFailureMessage.action")
let customer_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./Customer/Actions/Service/SyncStartedMessage.action */ "./build.definitions/Customer/Actions/Service/SyncStartedMessage.action")
let customer_actions_service_uploadoffline_action = __webpack_require__(/*! ./Customer/Actions/Service/UploadOffline.action */ "./build.definitions/Customer/Actions/Service/UploadOffline.action")
let customer_actions_updatecustomerentityfailuremessage_action = __webpack_require__(/*! ./Customer/Actions/UpdateCustomerEntityFailureMessage.action */ "./build.definitions/Customer/Actions/UpdateCustomerEntityFailureMessage.action")
let customer_actions_validationfailure_action = __webpack_require__(/*! ./Customer/Actions/ValidationFailure.action */ "./build.definitions/Customer/Actions/ValidationFailure.action")
let customer_globals_application_appdefinition_version_global = __webpack_require__(/*! ./Customer/Globals/Application/AppDefinition_Version.global */ "./build.definitions/Customer/Globals/Application/AppDefinition_Version.global")
let customer_globals_application_applicationname_global = __webpack_require__(/*! ./Customer/Globals/Application/ApplicationName.global */ "./build.definitions/Customer/Globals/Application/ApplicationName.global")
let customer_globals_application_supportemail_global = __webpack_require__(/*! ./Customer/Globals/Application/SupportEmail.global */ "./build.definitions/Customer/Globals/Application/SupportEmail.global")
let customer_globals_application_supportphone_global = __webpack_require__(/*! ./Customer/Globals/Application/SupportPhone.global */ "./build.definitions/Customer/Globals/Application/SupportPhone.global")
let customer_i18n_i18n_properties = __webpack_require__(/*! ./Customer/i18n/i18n.properties */ "./build.definitions/Customer/i18n/i18n.properties")
let customer_jsconfig_json = __webpack_require__(/*! ./Customer/jsconfig.json */ "./build.definitions/Customer/jsconfig.json")
let customer_pages_application_about_page = __webpack_require__(/*! ./Customer/Pages/Application/About.page */ "./build.definitions/Customer/Pages/Application/About.page")
let customer_pages_application_support_page = __webpack_require__(/*! ./Customer/Pages/Application/Support.page */ "./build.definitions/Customer/Pages/Application/Support.page")
let customer_pages_application_useractivitylog_page = __webpack_require__(/*! ./Customer/Pages/Application/UserActivityLog.page */ "./build.definitions/Customer/Pages/Application/UserActivityLog.page")
let customer_pages_customer_detail_page = __webpack_require__(/*! ./Customer/Pages/Customer_Detail.page */ "./build.definitions/Customer/Pages/Customer_Detail.page")
let customer_pages_customer_list_page = __webpack_require__(/*! ./Customer/Pages/Customer_List.page */ "./build.definitions/Customer/Pages/Customer_List.page")
let customer_pages_customers_edit_page = __webpack_require__(/*! ./Customer/Pages/Customers_Edit.page */ "./build.definitions/Customer/Pages/Customers_Edit.page")
let customer_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./Customer/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/Customer/Pages/ErrorArchive/ErrorArchive_Detail.page")
let customer_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./Customer/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/Customer/Pages/ErrorArchive/ErrorArchive_List.page")
let customer_pages_main_page = __webpack_require__(/*! ./Customer/Pages/Main.page */ "./build.definitions/Customer/Pages/Main.page")
let customer_rules_application_appupdatefailure_js = __webpack_require__(/*! ./Customer/Rules/Application/AppUpdateFailure.js */ "./build.definitions/Customer/Rules/Application/AppUpdateFailure.js")
let customer_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./Customer/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/Customer/Rules/Application/AppUpdateSuccess.js")
let customer_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./Customer/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/Customer/Rules/Application/ClientIsMultiUserMode.js")
let customer_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./Customer/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/Customer/Rules/Application/GetClientSupportVersions.js")
let customer_rules_application_getclientversion_js = __webpack_require__(/*! ./Customer/Rules/Application/GetClientVersion.js */ "./build.definitions/Customer/Rules/Application/GetClientVersion.js")
let customer_rules_application_onwillupdate_js = __webpack_require__(/*! ./Customer/Rules/Application/OnWillUpdate.js */ "./build.definitions/Customer/Rules/Application/OnWillUpdate.js")
let customer_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./Customer/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/Customer/Rules/Application/ResetAppSettingsAndLogout.js")
let customer_rules_emailvalidation_js = __webpack_require__(/*! ./Customer/Rules/EmailValidation.js */ "./build.definitions/Customer/Rules/EmailValidation.js")
let customer_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./Customer/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/Customer/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let customer_rules_logging_loglevels_js = __webpack_require__(/*! ./Customer/Rules/Logging/LogLevels.js */ "./build.definitions/Customer/Rules/Logging/LogLevels.js")
let customer_rules_logging_settracecategories_js = __webpack_require__(/*! ./Customer/Rules/Logging/SetTraceCategories.js */ "./build.definitions/Customer/Rules/Logging/SetTraceCategories.js")
let customer_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./Customer/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/Customer/Rules/Logging/SetUserLogLevel.js")
let customer_rules_logging_togglelogging_js = __webpack_require__(/*! ./Customer/Rules/Logging/ToggleLogging.js */ "./build.definitions/Customer/Rules/Logging/ToggleLogging.js")
let customer_rules_logging_tracecategories_js = __webpack_require__(/*! ./Customer/Rules/Logging/TraceCategories.js */ "./build.definitions/Customer/Rules/Logging/TraceCategories.js")
let customer_rules_logging_userlogsetting_js = __webpack_require__(/*! ./Customer/Rules/Logging/UserLogSetting.js */ "./build.definitions/Customer/Rules/Logging/UserLogSetting.js")
let customer_services_sampleservicev4_service = __webpack_require__(/*! ./Customer/Services/SampleServiceV4.service */ "./build.definitions/Customer/Services/SampleServiceV4.service")
let customer_styles_styles_css = __webpack_require__(/*! ./Customer/Styles/Styles.css */ "./build.definitions/Customer/Styles/Styles.css")
let customer_styles_styles_less = __webpack_require__(/*! ./Customer/Styles/Styles.less */ "./build.definitions/Customer/Styles/Styles.less")
let customer_styles_styles_light_css = __webpack_require__(/*! ./Customer/Styles/Styles.light.css */ "./build.definitions/Customer/Styles/Styles.light.css")
let customer_styles_styles_light_json = __webpack_require__(/*! ./Customer/Styles/Styles.light.json */ "./build.definitions/Customer/Styles/Styles.light.json")
let customer_styles_styles_light_nss = __webpack_require__(/*! ./Customer/Styles/Styles.light.nss */ "./build.definitions/Customer/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	customer_actions_application_appupdate_action : customer_actions_application_appupdate_action,
	customer_actions_application_appupdatefailuremessage_action : customer_actions_application_appupdatefailuremessage_action,
	customer_actions_application_appupdateprogressbanner_action : customer_actions_application_appupdateprogressbanner_action,
	customer_actions_application_appupdatesuccessmessage_action : customer_actions_application_appupdatesuccessmessage_action,
	customer_actions_application_logout_action : customer_actions_application_logout_action,
	customer_actions_application_navtoabout_action : customer_actions_application_navtoabout_action,
	customer_actions_application_navtoactivitylog_action : customer_actions_application_navtoactivitylog_action,
	customer_actions_application_navtosupport_action : customer_actions_application_navtosupport_action,
	customer_actions_application_onwillupdate_action : customer_actions_application_onwillupdate_action,
	customer_actions_application_reset_action : customer_actions_application_reset_action,
	customer_actions_application_resetmessage_action : customer_actions_application_resetmessage_action,
	customer_actions_application_usermenupopover_action : customer_actions_application_usermenupopover_action,
	customer_actions_closemodalpage_cancel_action : customer_actions_closemodalpage_cancel_action,
	customer_actions_closemodalpage_complete_action : customer_actions_closemodalpage_complete_action,
	customer_actions_closepage_action : customer_actions_closepage_action,
	customer_actions_customers_updateentity_action : customer_actions_customers_updateentity_action,
	customer_actions_errorarchive_errorarchive_syncfailure_action : customer_actions_errorarchive_errorarchive_syncfailure_action,
	customer_actions_errorarchive_navtoerrorarchive_detail_action : customer_actions_errorarchive_navtoerrorarchive_detail_action,
	customer_actions_errorarchive_navtoerrorarchive_list_action : customer_actions_errorarchive_navtoerrorarchive_list_action,
	customer_actions_genericbannermessage_action : customer_actions_genericbannermessage_action,
	customer_actions_genericmessagebox_action : customer_actions_genericmessagebox_action,
	customer_actions_genericnavigation_action : customer_actions_genericnavigation_action,
	customer_actions_generictoastmessage_action : customer_actions_generictoastmessage_action,
	customer_actions_logging_loguploadfailure_action : customer_actions_logging_loguploadfailure_action,
	customer_actions_logging_loguploadsuccessful_action : customer_actions_logging_loguploadsuccessful_action,
	customer_actions_logging_uploadlog_action : customer_actions_logging_uploadlog_action,
	customer_actions_logging_uploadlogprogress_action : customer_actions_logging_uploadlogprogress_action,
	customer_actions_navtocustomers_detail_action : customer_actions_navtocustomers_detail_action,
	customer_actions_navtocustomers_edit_action : customer_actions_navtocustomers_edit_action,
	customer_actions_navtocustomers_list_action : customer_actions_navtocustomers_list_action,
	customer_actions_service_closeoffline_action : customer_actions_service_closeoffline_action,
	customer_actions_service_closeofflinefailuremessage_action : customer_actions_service_closeofflinefailuremessage_action,
	customer_actions_service_closeofflinesuccessmessage_action : customer_actions_service_closeofflinesuccessmessage_action,
	customer_actions_service_downloadoffline_action : customer_actions_service_downloadoffline_action,
	customer_actions_service_downloadstartedmessage_action : customer_actions_service_downloadstartedmessage_action,
	customer_actions_service_initializeoffline_action : customer_actions_service_initializeoffline_action,
	customer_actions_service_initializeofflinefailuremessage_action : customer_actions_service_initializeofflinefailuremessage_action,
	customer_actions_service_initializeofflinesuccessmessage_action : customer_actions_service_initializeofflinesuccessmessage_action,
	customer_actions_service_syncfailuremessage_action : customer_actions_service_syncfailuremessage_action,
	customer_actions_service_syncstartedmessage_action : customer_actions_service_syncstartedmessage_action,
	customer_actions_service_uploadoffline_action : customer_actions_service_uploadoffline_action,
	customer_actions_updatecustomerentityfailuremessage_action : customer_actions_updatecustomerentityfailuremessage_action,
	customer_actions_validationfailure_action : customer_actions_validationfailure_action,
	customer_globals_application_appdefinition_version_global : customer_globals_application_appdefinition_version_global,
	customer_globals_application_applicationname_global : customer_globals_application_applicationname_global,
	customer_globals_application_supportemail_global : customer_globals_application_supportemail_global,
	customer_globals_application_supportphone_global : customer_globals_application_supportphone_global,
	customer_i18n_i18n_properties : customer_i18n_i18n_properties,
	customer_jsconfig_json : customer_jsconfig_json,
	customer_pages_application_about_page : customer_pages_application_about_page,
	customer_pages_application_support_page : customer_pages_application_support_page,
	customer_pages_application_useractivitylog_page : customer_pages_application_useractivitylog_page,
	customer_pages_customer_detail_page : customer_pages_customer_detail_page,
	customer_pages_customer_list_page : customer_pages_customer_list_page,
	customer_pages_customers_edit_page : customer_pages_customers_edit_page,
	customer_pages_errorarchive_errorarchive_detail_page : customer_pages_errorarchive_errorarchive_detail_page,
	customer_pages_errorarchive_errorarchive_list_page : customer_pages_errorarchive_errorarchive_list_page,
	customer_pages_main_page : customer_pages_main_page,
	customer_rules_application_appupdatefailure_js : customer_rules_application_appupdatefailure_js,
	customer_rules_application_appupdatesuccess_js : customer_rules_application_appupdatesuccess_js,
	customer_rules_application_clientismultiusermode_js : customer_rules_application_clientismultiusermode_js,
	customer_rules_application_getclientsupportversions_js : customer_rules_application_getclientsupportversions_js,
	customer_rules_application_getclientversion_js : customer_rules_application_getclientversion_js,
	customer_rules_application_onwillupdate_js : customer_rules_application_onwillupdate_js,
	customer_rules_application_resetappsettingsandlogout_js : customer_rules_application_resetappsettingsandlogout_js,
	customer_rules_emailvalidation_js : customer_rules_emailvalidation_js,
	customer_rules_errorarchive_errorarchive_checkforsyncerror_js : customer_rules_errorarchive_errorarchive_checkforsyncerror_js,
	customer_rules_logging_loglevels_js : customer_rules_logging_loglevels_js,
	customer_rules_logging_settracecategories_js : customer_rules_logging_settracecategories_js,
	customer_rules_logging_setuserloglevel_js : customer_rules_logging_setuserloglevel_js,
	customer_rules_logging_togglelogging_js : customer_rules_logging_togglelogging_js,
	customer_rules_logging_tracecategories_js : customer_rules_logging_tracecategories_js,
	customer_rules_logging_userlogsetting_js : customer_rules_logging_userlogsetting_js,
	customer_services_sampleservicev4_service : customer_services_sampleservicev4_service,
	customer_styles_styles_css : customer_styles_styles_css,
	customer_styles_styles_less : customer_styles_styles_less,
	customer_styles_styles_light_css : customer_styles_styles_light_css,
	customer_styles_styles_light_json : customer_styles_styles_light_json,
	customer_styles_styles_light_nss : customer_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/Customer/Styles/Styles.css":
/*!******************************************************!*\
  !*** ./build.definitions/Customer/Styles/Styles.css ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/Customer/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Customer/Styles/Styles.less":
/*!*******************************************************!*\
  !*** ./build.definitions/Customer/Styles/Styles.less ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/Customer/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Customer/Styles/Styles.light.css":
/*!************************************************************!*\
  !*** ./build.definitions/Customer/Styles/Styles.light.css ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Customer/Styles/Styles.light.nss":
/*!************************************************************!*\
  !*** ./build.definitions/Customer/Styles/Styles.light.nss ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/Customer/Pages/Application/About.page":
/*!*****************************************************************!*\
  !*** ./build.definitions/Customer/Pages/Application/About.page ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/Customer/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/Customer/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/Customer/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/Customer/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Customer/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Customer/Pages/Application/Support.page":
/*!*******************************************************************!*\
  !*** ./build.definitions/Customer/Pages/Application/Support.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/Customer/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/Customer/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/Customer/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/Customer/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Customer/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Customer/Pages/Application/UserActivityLog.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/Customer/Pages/Application/UserActivityLog.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/Customer/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/Customer/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/Customer/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/Customer/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/Customer/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/Customer/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/Customer/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/Customer/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/Customer/Pages/Customer_Detail.page":
/*!***************************************************************!*\
  !*** ./build.definitions/Customer/Pages/Customer_Detail.page ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"ObjectHeader":{"Subhead":"{FirstName}","Footnote":"{EmailAddress}","Description":"{CustomerID}","StatusText":"{PhoneNumber}","DetailImage":"sap-icon://customer","DetailImageIsCircular":false,"BodyText":"{DateOfBirth}","HeadlineText":"{LastName}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading"},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"KeyAndValues":[{"Value":"{HouseNumber} {Street}","_Name":"KeyValue0","KeyName":"Address","Visible":true},{"Value":"{PostalCode} {Country}","_Name":"KeyValue1","KeyName":"City","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":2}}]}],"DesignTimeTarget":{"Service":"/Customer/Services/SampleServiceV4.service","EntitySet":"Customers"},"_Type":"Page","_Name":"Customer_Detail","Caption":"Details","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Customer/Actions/NavToCustomers_Edit.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Customer/Pages/Customer_List.page":
/*!*************************************************************!*\
  !*** ./build.definitions/Customer/Pages/Customer_List.page ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","Target":{"Service":"/Customer/Services/SampleServiceV4.service","EntitySet":"Customers"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"ContactCell":{"Visible":true,"ContextMenu":{"PerformFirstActionWithFullSwipe":true},"DetailImage":"","Headline":"{LastName}","Subheadline":"{FirstName}","Description":"{City}","OnPress":"/Customer/Actions/NavToCustomers_Detail.action","ActivityItems":[{"_Name":"SectionContactCell0ActivityItems0","ActivityType":"Phone","ActivityValue":"{PhoneNumber}"},{"_Name":"SectionContactCell0ActivityItems1","ActivityType":"Email","ActivityValue":"{EmailAddress}"}]},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"Search":{"Enabled":true,"BarcodeScanner":true}}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Customer_List","Caption":"Customer","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Customer/Pages/Customers_Edit.page":
/*!**************************************************************!*\
  !*** ./build.definitions/Customer/Pages/Customers_Edit.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Controls":[{"Value":"{FirstName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCFirstName","IsVisible":true,"Separator":true,"Caption":"\tFirst Name","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"{LastName}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCLastName","IsVisible":true,"Separator":true,"Caption":"Last Name","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCPhone","IsVisible":true,"Separator":true,"Caption":"Phone","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FCEmail","IsVisible":true,"Separator":true,"Caption":"Email","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true}]}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Customers_Edit","Caption":"Customers_Edit","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Item","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"Visible":true,"OnPress":"/Customer/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Customer/Actions/Customers_UpdateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Customer/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/Customer/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Customer/Pages/ErrorArchive/ErrorArchive_List.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/Customer/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/Customer/Services/SampleServiceV4.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"None","OnPress":"/Customer/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Customer/Pages/Main.page":
/*!****************************************************!*\
  !*** ./build.definitions/Customer/Pages/Main.page ***!
  \****************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Styles":{"ImageBackgroundColor":"MyButton"},"_Type":"Section.Type.Image","_Name":"SectionImage0","Visible":true,"Image":"sap-icon://address-book","Alignment":"Center","ContentMode":"ScaleAspectFit"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Name":"SectionButton0","Title":"Customer","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://customer","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/Customer/Actions/NavToCustomers_List.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/Customer/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"Customer","Version":"/Customer/Globals/Application/AppDefinition_Version.global","MainPage":"/Customer/Pages/Main.page","OnLaunch":["/Customer/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/Customer/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/Customer/Actions/Service/InitializeOffline.action","Styles":"/Customer/Styles/Styles.css","Localization":"/Customer/i18n/i18n.properties","_SchemaVersion":"23.12","StyleSheets":{"Styles":{"css":"/Customer/Styles/Styles.light.css","ios":"/Customer/Styles/Styles.light.nss","android":"/Customer/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/Customer/Styles/Styles.light.nss","android":"/Customer/Styles/Styles.light.json"}}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/AppUpdate.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/AppUpdate.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/Customer/Rules/Application/AppUpdateFailure.js","OnSuccess":"/Customer/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/AppUpdateFailureMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/AppUpdateFailureMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/AppUpdateProgressBanner.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/AppUpdateProgressBanner.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/Customer/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/AppUpdateSuccessMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/AppUpdateSuccessMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/Logout.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/Logout.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/NavToAbout.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/NavToAbout.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/Customer/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/NavToActivityLog.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/NavToActivityLog.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/Customer/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/NavToSupport.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/NavToSupport.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/Customer/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/OnWillUpdate.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/OnWillUpdate.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/Reset.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/Reset.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/ResetMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/ResetMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/Customer/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Application/UserMenuPopover.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Application/UserMenuPopover.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://synchronize","OnPress":"/Customer/Actions/Service/SyncStartedMessage.action","Title":"Sync Changes","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/Customer/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/Customer/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/Customer/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/Customer/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/Customer/Actions/Application/Logout.action","Title":"Logout","Visible":"/Customer/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/CloseModalPage_Cancel.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/CloseModalPage_Cancel.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage","ActionResult":{"_Name":"CloseModalPage_Cancel"},"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true}

/***/ }),

/***/ "./build.definitions/Customer/Actions/CloseModalPage_Complete.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/CloseModalPage_Complete.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/ClosePage.action":
/*!*************************************************************!*\
  !*** ./build.definitions/Customer/Actions/ClosePage.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Customers_UpdateEntity.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Customers_UpdateEntity.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"Customers_UpdateEntity"},"OnFailure":"/Customer/Actions/UpdateCustomerEntityFailureMessage.action","OnSuccess":"/Customer/Actions/CloseModalPage_Complete.action","ValidationRule":"/Customer/Rules/EmailValidation.js","OnSuccessLog":{"Message":"","Level":"Off"},"Target":{"Service":"/Customer/Services/SampleServiceV4.service","EntitySet":"Customers","ReadLink":"{@odata.readLink}"}}

/***/ }),

/***/ "./build.definitions/Customer/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/Customer/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Customer/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Customer/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/GenericBannerMessage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/GenericBannerMessage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/GenericMessageBox.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/Customer/Actions/GenericMessageBox.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/GenericNavigation.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/Customer/Actions/GenericNavigation.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/Customer/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/GenericToastMessage.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/Customer/Actions/GenericToastMessage.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Logging/LogUploadFailure.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Logging/LogUploadFailure.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Logging/LogUploadSuccessful.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Logging/LogUploadSuccessful.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Logging/UploadLog.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Logging/UploadLog.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/Customer/Actions/Logging/LogUploadFailure.action","OnSuccess":"/Customer/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Logging/UploadLogProgress.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Logging/UploadLogProgress.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/Customer/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/NavToCustomers_Detail.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/NavToCustomers_Detail.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Detail"},"PageToOpen":"/Customer/Pages/Customer_Detail.page"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/NavToCustomers_Edit.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/Customer/Actions/NavToCustomers_Edit.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_Edit"},"PageToOpen":"/Customer/Pages/Customers_Edit.page","ModalPage":true}

/***/ }),

/***/ "./build.definitions/Customer/Actions/NavToCustomers_List.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/Customer/Actions/NavToCustomers_List.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"NavToCustomers_List"},"PageToOpen":"/Customer/Pages/Customer_List.page"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/CloseOffline.action":
/*!************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/CloseOffline.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/Customer/Services/SampleServiceV4.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/Customer/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/Customer/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/CloseOfflineFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/CloseOfflineFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/CloseOfflineSuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/DownloadOffline.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/DownloadOffline.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/Customer/Services/SampleServiceV4.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"ProductCategories","Query":"ProductCategories"},{"Name":"Products","Query":"Products"},{"Name":"ProductTexts","Query":"ProductTexts"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"},{"Name":"Stock","Query":"Stock"},{"Name":"Suppliers","Query":"Suppliers"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/Customer/Actions/Service/SyncFailureMessage.action","OnSuccess":"/Customer/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/DownloadStartedMessage.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/DownloadStartedMessage.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/Customer/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/InitializeOffline.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/InitializeOffline.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/Customer/Services/SampleServiceV4.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"ProductCategories","Query":"ProductCategories"},{"Name":"Products","Query":"Products"},{"Name":"ProductTexts","Query":"ProductTexts"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"},{"Name":"Stock","Query":"Stock"},{"Name":"Suppliers","Query":"Suppliers"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/Customer/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/Customer/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/InitializeOfflineFailureMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/SyncFailureMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/SyncFailureMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/SyncStartedMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/SyncStartedMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/Customer/Actions/Service/UploadOffline.action","OnFailure":"/Customer/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/Service/UploadOffline.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/Service/UploadOffline.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/Customer/Services/SampleServiceV4.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/Customer/Actions/Service/DownloadStartedMessage.action","OnFailure":"/Customer/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/UpdateCustomerEntityFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/Customer/Actions/UpdateCustomerEntityFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"UpdateCustomerEntityFailureMessage"},"Message":"Failed to Save Customer Updates - {#ActionResults:Customers_UpdateEntity/error}","Title":"Update Customer","OKCaption":"Ok"}

/***/ }),

/***/ "./build.definitions/Customer/Actions/ValidationFailure.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/Customer/Actions/ValidationFailure.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"ValidationFailure"},"Message":"Email address is not in the correct format recipient @ domain . domaintype","Title":"Validate Email","OKCaption":"Ok"}

/***/ }),

/***/ "./build.definitions/Customer/Globals/Application/AppDefinition_Version.global":
/*!*************************************************************************************!*\
  !*** ./build.definitions/Customer/Globals/Application/AppDefinition_Version.global ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Customer/Globals/Application/ApplicationName.global":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Customer/Globals/Application/ApplicationName.global ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Customer/Globals/Application/SupportEmail.global":
/*!****************************************************************************!*\
  !*** ./build.definitions/Customer/Globals/Application/SupportEmail.global ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Customer/Globals/Application/SupportPhone.global":
/*!****************************************************************************!*\
  !*** ./build.definitions/Customer/Globals/Application/SupportPhone.global ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Customer/Services/SampleServiceV4.service":
/*!*********************************************************************!*\
  !*** ./build.definitions/Customer/Services/SampleServiceV4.service ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV4","OfflineEnabled":true,"SourceType":"Mobile"}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "webpack/container/entry/bundle.js":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ "./build.definitions/application-index.js")))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ }),

/***/ "./build.definitions/Customer/Styles/Styles.light.json":
/*!*************************************************************!*\
  !*** ./build.definitions/Customer/Styles/Styles.light.json ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/Customer/jsconfig.json":
/*!**************************************************!*\
  !*** ./build.definitions/Customer/jsconfig.json ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = undefined;
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/bundle.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map