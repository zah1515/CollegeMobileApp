{
	"_Name": "Customer",
	"Version": "/Customer/Globals/Application/AppDefinition_Version.global",
	"MainPage": "/Customer/Pages/Main.page",
	"OnLaunch": [
		"/Customer/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/Customer/Rules/Application/OnWillUpdate.js",
	"OnDidUpdate": "/Customer/Actions/Service/InitializeOffline.action",
	"Styles": "/Customer/Styles/Styles.less",
	"Localization": "/Customer/i18n/i18n.properties",
	"_SchemaVersion": "23.12"
}