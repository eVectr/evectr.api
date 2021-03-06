
'use strict';

/** @type {CFG.SPCE.SpaceHandler} */
module.exports = {
	Data:  [
		function (path, req) { 
			return   {
				"user_id": null,
				"display_name": null,
				"email_address": null,
				"name": { "first": null, "last": null },
				"birth_date": null,
				"photos": { "profile": null, "cover": null },
				"location": {
					"id": null,
					"label": "",
					"codes": { "region": "", "country": "" }
				},
				"details": {
					"hobbies": [],
					"languages": [],
					"nationalities": [],
					"religion": { "value": null, "label": null },
					"identity": {
						"sex": null,
						"marital": null,
						"gender": { "value": null, "label": null },
						"orient": { "value": null, "label": null }
					},
					"misc": {
						"description": null,
						"education": { "institutions": null, "description": null }
					}
				},
				"provider_id": null,
				"services": [],
				"settings": {
					"email": 	  null,
					"timezone":   null,
					"language":   null,
					"visibility": {
						"items": [
							{
								"id": 2,
								"kind": "column",
								"field": "email_address",
								"name": "Email Address",
								"level": 4,
								"value": 1,
								"follows": "",
								"status": false
							},
							{
								"id": 6,
								"kind": "column",
								"field": "birth_date",
								"name": "Age & Birthday",
								"level": 2,
								"value": 16,
								"follows": "",
								"status": false
							},
							{
								"id": 3,
								"kind": "column",
								"field": "first_name",
								"name": "First Name",
								"level": 2,
								"value": 2,
								"follows": "",
								"status": false
							},
							{
								"id": 4,
								"kind": "column",
								"field": "last_name",
								"name": "Last Name",
								"level": 2,
								"value": 4,
								"follows": "first_name",
								"status": false
							},
							{
								"id": 7,
								"kind": "column",
								"field": "location",
								"name": "Location",
								"level": 3,
								"value": 32,
								"follows": "",
								"status": false
							},
							{
								"id": 10,
								"kind": "table",
								"field": "user_hobbies",
								"name": "Hobbies",
								"level": 5,
								"value": 64,
								"follows": "",
								"status": false
							},
							{
								"id": 11,
								"kind": "table",
								"field": "user_languages",
								"name": "Languages",
								"level": 5,
								"value": 128,
								"follows": "",
								"status": false
							},
							{
								"id": 12,
								"kind": "table",
								"field": "user_nationalities",
								"name": "Nationalities",
								"level": 5,
								"value": 256,
								"follows": "",
								"status": false
							},
							{
								"id": 13,
								"kind": "table",
								"field": "user_religion",
								"name": "Spirituality",
								"level": 5,
								"value": 512,
								"follows": "",
								"status": false
							},
							{
								"id": 16,
								"kind": "column",
								"field": "profile_sex",
								"name": "Sex",
								"level": 2,
								"value": 2048,
								"follows": "",
								"status": false
							},
							{
								"id": 14,
								"kind": "table",
								"field": "user_gender",
								"name": "Gender Indentity",
								"level": 5,
								"value": 1024,
								"follows": "profile_sex",
								"status": false
							},
							{
								"id": 15,
								"kind": "table",
								"field": "user_orient",
								"name": "Orientation",
								"level": 5,
								"value": 1024,
								"follows": "profile_sex",
								"status": false
							},
							{
								"id": 17,
								"kind": "column",
								"field": "profile_marital_status",
								"name": "Marital Status",
								"level": 5,
								"value": 4096,
								"follows": "",
								"status": false
							},
							{
								"id": 18,
								"kind": "column",
								"field": "profile_education",
								"name": "Education",
								"level": 4,
								"value": 8192,
								"follows": "",
								"status": false
							}
						],
						"value": 0
					},
					"modes": 	 { 
						"admin": 		 0, 
						"transactional": 0, 
						"provider": 	 0 
					}
				},
				"checks": { 
					"tour_done": 	0,
					"status": 		0, 
					"verified": 	0, 
					"identified": 	0, 
					"accredited": 	0, 
					"rating": 		null
				},
				"member_since": null
			};
		},
	],
	Call: function(path, params, query, body, files, user) {
		return {
			method:	'GET',
			path: 	'/user',
			params: { uids: user.Scopes.user_id },
			query:	Assign({},{
						uuid: user.Scopes.user_id,
						single:true,links:true,
					}, query||{}),
			body:	body||{},
			files:	files||[]
		};
	},
	Build: function (Actions, Stores, LID) {
		var THS = this;
		return function (res) {
			var PNL 	= 	{ from: 'Evectr', name: ['Content','Panel'		] },
				BLK 	= 	{ from: 'Evectr', name: ['Content','Block'		] },
				XPUT 	= 	{ from: 'Evectr', name: [   'Form','Xput'		] },
				NPUT	= 	{ from: 'Evectr', name: [   'Form','Input'    	] },
				CHKBOX 	= 	{ from: 'Evectr', name: [   'Form','Checkbox'	] },
				BR  	= 	{ tag: 'br' },
				HR  	= 	{ tag: 'hr', props: { className: 'spread' } },
				HRS  	= 	{ tag: 'hr', props: { className: 'MTB spread' } },
				FLT 	= 	function FLT(v) { return !!v },
				VISIBS  = 	function VISIBS(v) { 
								var grp = 'user-vis', checked = eval(v.status);
								visibility += (checked?(visibility|v.value):0);
								return {
									tag: 	'div', 
									props:	{ className: 'half' }, 
									items:  [{
										tag:	CHKBOX,
										props:	{
											id: 		[ grp, v.field ].join('-'),
											name:		  v.field,
											form: 		  grp,
											label:		  v.name+':',
											checked:	  checked,
											value:		  v.value,
											styles: 	['info-y','good-n'],
											yes:		 'Hidden', // ncon: '',
											no:			 'Public', // ycon: '',
											increment:	  visivalue,
											follows:	  v.follows||null,
									}	}]
							};	},
				passpat = 	/[~{(\[!"#$%&'\w|*+,./\:;?@^_`\])}-]{8,}/,
				dta 	= 	Imm.fromJS(THS.Data[0]()),
				mrg 	= 	Imm.fromJS(res);
			// -----
			res = dta.mergeDeepWith(
				function(o,n,k) { 
					return (IS(n)=='socket'?o||null:n);
				}, 	mrg
			).toJS();
			// -----
			var photos 			= res.photos||{},
				settings 		= res.settings||{},
				email 			= settings.email,
				timezone 		= settings.timezone,
				language 		= settings.language,
				visivalue		= 'user-vis-value',
				visible 		= (settings.visibility||{}),
				visibilities 	= (visible.items||[]).map(VISIBS),
				visibility		= (visible.value||0),
				modes 			= settings.modes||{};
			// -----
			return Stores.Apps[LID].singleton.updateStore({
				header:		{
					title: 	{
						cover: 	photos.cover,
						user:	{
							mode:	'edit',
							photo: 	photos.profile,
							uname: 	'',
							name: 	{ First: 'My', Last: 'Settings' },
							badges: [],
							locale: null,
							sex:	null,
							age: 	null,
						},
					},
				},
				content: 	{
					built: 		true,
					segments: 	{
						copy: [
							{     // GENERAL
								tag:	PNL, props: 	{ 
									name:	'settings-general',
									header: { label: 'General',  icon: 'cog', subs: [
										{ name: 'user-modes',    label: 'User Mode'     },
										{ name: 'user-general',  label: 'Site Configs' 	},
									]	},
									align:	'gridSlice',
									form: 	{
										'id':			'user-other',
										'data-action': 	'/user/settings',
										'method':		'PUT',
										'buttons':		[
											{ kind:'submit',label:'Update Settings',style:'norm' },
										],
									},
									body:	[
										{	tag:	BLK, props:  { 
												name: 	'user-modes', 
												header: { fixed: true, label: 'User Mode' },
												align:	'spread gridSlice',
												items: 	[
													{	tag: 'p', props : { className: 'spread', style: { fontSize: 'medium' } }, items: [
														"Enable or disable your status as a Provider or Transactional User. If you disable your Provider status, but already had ",
														"Services set up, you can always re-enable your status and they'll be right where you left them.",
													]	}, 
													!!!modes.provider ? { 	
														tag:	'div',
														props:	{ className: 'half' },
														items: 	[{
															tag:	{ from: 'Evectr', name: ['Form','Checkbox'] },
															props:	{
																id: 		'user-is-transactional',
																name: 		'Transact',
																label:		'You are a Transactional User:',
																checked:	 Boolean(modes.transactional),
																value:		 1,
																styles: 	['norm-y','info-n'],
														}	}]
													} : null, 	
													{ 	tag:	'div',
														props:	{ className: 'half'+(!!modes.provider?' four':'') },
														items: 	[{
															tag:	{ from: 'Evectr', name: ['Form','Checkbox'] },
															props:	{
																id: 		'user-is-provider',
																name: 		'Provider',
																label:		'You are a Service Provider:',
																checked:	 Boolean(modes.provider),
																value:		 1,
																styles: 	['good-y','info-n'],
														}	}]
													}, 
												]
										}	}, 	HR, 
										{	tag:	BLK, props:  { 
												name: 	'user-general', 
												header: { fixed: true, label: 'Site Configuration' },
												align:	'spread gridSlice',
												items: 	[
													{	tag: 'p', props : { className: 'spread', style: { fontSize: 'medium' } }, items: [
														"Choose your preferred Timezone as well as your preferred Language for the site.",
													]	}, 
													{ 	tag:	'div',
														props:	{ className: 'half' },
														items: 	[{	
															tag:	XPUT, props:	{
																id: 		'user-prefered-tz',
																name: 		'TZone',
																icon:		'clock',
																placeholder:'Prefered Site Timezone',
																tokens:		[!!timezone ? { 
																	label: timezone, 
																	value: timezone 
																} : null].filter(FLT),
																limit:		 1,
																duplicate:	 true,
																data:		{
																	id:   		'user-prefered-tz-sgst', 
																	url:  		'/locale/timezone',
																	list: 		'/locale/timezone',
																},
														}	}]	
													},
													{ 	tag:	'div',
														props:	{ className: 'half' },
														items: 	[{
															tag:	XPUT, props:	{
																id: 		'user-prefered-lang',
																name: 		'LGID',
																icon:		'language',
																placeholder:'Prefered Site Language',
																tokens:		[!!language ? { 
																	label: language.label, 
																	value: language.value, 
																} : null].filter(FLT),
																limit:		 1,
																duplicate:	 true,
																data:		{
																	id:   		'user-prefered-lang-sgst', 
																	url:  		'/search/for/languages',
																	list: 		'/list/languages',
																},
														}	}]	
													},
												],
											}
										},	HR, 
									]	
								}
							},	{ // PRIVACY
								tag:	PNL, props: 	{ 
									name:	'settings-privacy',
									header: { label: 'Privacy', icon: 'user-secret' },
									align:	'gridSlice',
									form: 	{
										'id':			 'user-privacy',
										'data-action': 	 '/user/settings/visibility',
										'method':		 'PUT',
										'buttons':		[
											{ kind:'submit',label:'Update Privacy',style:'good',start:  'one',size:'half' },
											{ kind: 'reset',label: 'Reset Privacy',style:'warn',start:'seven',size:'half' },
										],
									},
									body:	[
										{ tag: BLK, props: { 
											name: 	'user-vis-note', 
											align:	'spread',
											items:	[
												{	tag: 	'p', props: { className: 'text spread' },
													items: 	[
														'This section allows you to select which parts of your Profile are allowed to be shown.',
												]	},
												{	tag: 	'p', props: { className: 'text spread' },
													items: 	[
														'Note that depending on you ', { tag: 'b', items: ['User-Status'] },' (',
														{ tag: 'span', props: { className: 'example' }, items: ['Service-Provider, Transactional'] },
														'), some items are required to be public. This is for Trust & Accountabiliy reasons. Please see our ',
														{ tag: 'a', items: ['Help Section'] }, ' for more information.',
												]	},
										]	}	}
									].concat(visibilities, [ 
										{ 	tag:	NPUT, props:	{
											kind:		'hidden',
											name: 		'Visibles',
											id: 		 visivalue,
											required:	 true,
											value:  	 visibility,
										}	},	HRS,
									]),	
								}
							},	{ // SECURITY
								tag:	PNL, props: 	{ 
									name:	'settings-security',
									header: { label: 'Security',  icon: 'fingerprint', subs: [
										{ name: 'user-sessions',     label: 'Active Sessions' 	},
										{ name: 'form-email-change', label: 'Change Email' 		},
										{ name: 'form-pass-change',  label: 'Change Password' 	},
									]	},
									body:	[
										{	tag:	BLK, props:  { 
											name: 	'user-sessions', 
											header: { fixed: true, label: 'Your Active Sessions' },
											align:	'gridSlice',
											items: 	[
												{	tag: 'p', props : {
														className: 'spread', style: { fontSize: 'medium' }
													}, items: [
														"Above is a list of all of the devices currently logged in to your account. ",
														"The ", {tag:"em",items:["italicized"]}, " item represents the device you're ",
														"currently using\u2014this cannot be removed, as you can simply logout using the ",
														"top menu.", BR, BR, 
														"If you notice any sessions here that you do not recognize, remove them ",
														"immediately by clicking on the respective ", {tag:"strong",items:["delete "]},
														{tag:"span",props:{className:'tkn nope'},items:[
															{tag:'i',props:{className:'fas fa-trash fa-fw'}}
														]	}, {tag:"strong",items:[" button"]}," and consider ", 
														{tag:"a",props:{href:'#form-pass-change'},items:["changing your password."]},
												]	}, 	
												{	tag: 	{ from: 'Evectr', name: ['App', 'Sessions'] }, 
													props:	{ list: [] }
												}, 		
											]
										}	}, HRS, 
										{	tag:	BLK, props:  { 
											name: 	'user-email-change', 
											header: { fixed: true, label: 'Change Your Email' },
											align:	'gridSlice',
											form: 	{
												'id':			'form-email-change',
												'data-action': 	'/user/settings/email',
												'method':		'PUT',
												'buttons':		[
													{ kind:'submit',label:'Change Email',style:'nope inline',start:'nine',size:'third' },
												],
											},
											items: 	[
												{	tag: 'p', props : { className: 'spread', style: { fontSize: 'medium' } }, items: [
													"Change your Email here if needed. All of your active sessions will be cleared, so you'll be prompted to log back in on your other devices.",
												]	}, 
												{	tag:	'div',
													props:	{ className: 'most' },
													items: 	[{
														tag:	XPUT, props:	{
															id: 		'user-email',
															kind:		'email',
															name: 		'Email',
															icon:		'envelope',
															placeholder:'Email',
															value:		 email,
															priority:	'*',
															validate: 	{
																pattern: /[\w_.-]+@[\w.-]+\.[A-z]{2,}/,
																invalid: 'Come on, that Email is invalid...',
															},
														}
												}]	},
											]
										}	}, HRS, 
										{	tag:	BLK, props:  { 
											name: 	'user-pass-change', 
											header: { fixed: true, label: 'Change Your Password' },
											align:	'gridSlice',
											form: 	{
												'id':			'form-pass-change',
												'data-action': 	'/user/settings/password',
												'method':		'PUT',
												'buttons':		[
													{ kind:'submit',label:'Change Password',style:'nope',start:'one',size:'spread' },
												],
											},
											items: 	[
												{	tag: 'p', props : { className: 'spread', style: { fontSize: 'medium' } }, items: [
													"If you're changing your Password, all of your active sessions will be cleared, so you'll be prompted to log back in on your other devices.",
												]	}, 
												{ 	tag:	'div',
													props:	{ className: 'spread' },
													items: 	[{
														tag:	XPUT, props:	{
															id: 		'user-pass-current',
															kind:		'password',
															name: 		'Current',
															icon:		'key',
															placeholder:'Current Password',
															complete:	'password',
															priority:	'*',
															validate: 	{
																invalid: 'Obviously, you\'ll need to enter your Current Password...',
															},
														}
												}]	},
												{ 	tag:	'div',
													props:	{ className: 'half' },
													items: 	[{
														tag:	XPUT, props:	{
															id: 		'user-pass-new',
															kind:		'password',
															name: 		'Password',
															icon:		'lock-open',
															placeholder:'New Password',
															complete:	'new-password',
															priority:	'*',
															validate: 	{
																pattern: passpat,
																invalid: 'Must be 8+ characters. No spaces; nothing accented.',
															},
														}
												}]	},
												{ 	tag:	'div',
													props:	{ className: 'half' },
													items: 	[{
														tag:	XPUT, props:	{
															id: 		'user-pass-confirm',
															kind:		'password',
															name: 		'ConfPass',
															icon:		'lock',
															placeholder:'Confirm Password',
															complete:	'new-password',
															priority:	'*',
															validate: 	{
																pattern: passpat,
																invalid: 'This doesn\'t match the other Password.',
															},
														}
												}]	},
											]
										}	}, 
									]
								}
							}, 
						],
						other: [
							{ 	 // TIPS
								tag:	PNL, props: 	{ 
									kind:	'side',
									name:	'tips',
									header: { label: 'Tips',  icon: 'info-circle' },
									align: 	'gridPair',
									body:	[],	
								}
							},
						],
					}
				},
			}, true);
		}
	}
}
