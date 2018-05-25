const URLS = {
    PC: {
        URL:
            "https://uplayoverlay.ubi.com/ubiservices/v1/profiles?platformType=uplay&nameOnPlatform=",
        STATS_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/playerstats2/statistics?",
        LEVEL_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/r6playerprofile/playerprofile/progressions?profile_ids=",
        REVERSE_URL:
            "https://uplayoverlay.ubi.com/ubiservices/v2/profiles?platformType=uplay&idOnPlatform=",
        TIME_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/playerstats2/statistics?statistics=casualpvp_timeplayed,rankedpvp_timeplayed&populations=",
        RANK_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/r6karma/players?board_id=pvp_ranked&",
        LOGIN_URL: "https://uplayconnect.ubi.com/ubiservices/v2/profiles/sessions?"
    },
    PS4: {
        URL:
            "https://uplayoverlay.ubi.com/ubiservices/v1/profiles?platformType=psn&nameOnPlatform=",
        STATS_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/05bfb3f7-6c21-4c42-be1f-97a33fb5cf66/sandboxes/OSBOR_PS4_LNCH_A/playerstats2/statistics?",
        LEVEL_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/05bfb3f7-6c21-4c42-be1f-97a33fb5cf66/sandboxes/OSBOR_PS4_LNCH_A/r6playerprofile/playerprofile/progressions?profile_ids=",
        REVERSE_URL:
            "https://uplayoverlay.ubi.com/ubiservices/v2/profiles?platformType=psn&idOnPlatform=",
        TIME_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/05bfb3f7-6c21-4c42-be1f-97a33fb5cf66/sandboxes/OSBOR_PS4_LNCH_A/playerstats2/statistics?statistics=casualpvp_timeplayed,rankedpvp_timeplayed&populations=",
        RANK_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/05bfb3f7-6c21-4c42-be1f-97a33fb5cf66/sandboxes/OSBOR_PS4_LNCH_A/r6karma/players?board_id=pvp_ranked&",
        LOGIN_URL: "https://uplayconnect.ubi.com/ubiservices/v2/profiles/sessions?"
    },
    XBOX: {
        URL:
            "https://uplayoverlay.ubi.com/ubiservices/v1/profiles?platformType=xbl&nameOnPlatform=",
        STATS_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/98a601e5-ca91-4440-b1c5-753f601a2c90/sandboxes/OSBOR_XBOXONE_LNCH_A/playerstats2/statistics?",
        LEVEL_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/98a601e5-ca91-4440-b1c5-753f601a2c90/sandboxes/OSBOR_XBOXONE_LNCH_A/r6playerprofile/playerprofile/progressions?profile_ids=",
        REVERSE_URL:
            "https://uplayoverlay.ubi.com/ubiservices/v2/profiles?platformType=xbl&idOnPlatform=",
        TIME_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/98a601e5-ca91-4440-b1c5-753f601a2c90/sandboxes/OSBOR_XBOXONE_LNCH_A/playerstats2/statistics?statistics=casualpvp_timeplayed,rankedpvp_timeplayed&populations=",
        RANK_URL:
            "https://public-ubiservices.ubi.com/v1/spaces/98a601e5-ca91-4440-b1c5-753f601a2c90/sandboxes/OSBOR_XBOXONE_LNCH_A/r6karma/players?board_id=pvp_ranked&",
        LOGIN_URL: "https://uplayconnect.ubi.com/ubiservices/v2/profiles/sessions?"
    }
};

const WEAPONTYPES = {
    1: "assault",
    2: "smg",
    3: "lmg",
    4: "sniper",
    5: "pistol",
    6: "shotgun",
    7: "mp",
    8: "shield",
    9: "launcher",
    B: "B"
};

const OPERATORS = [
    {
        id: "recruit1",
        name: "recruit1",
        readableName: "Recruit1",
        fullIndex: "1:1",
        gadget: "nothing"
    },
    {
        id: "recruit2",
        name: "recruit2",
        readableName: "Recruit2",
        fullIndex: "1:2",
        gadget: "nothing"
    },
    {
        id: "recruit3",
        name: "recruit3",
        readableName: "Recruit3",
        fullIndex: "1:3",
        gadget: "nothing"
    },
    {
        id: "recruit4",
        name: "recruit4",
        readableName: "Recruit4",
        fullIndex: "1:4",
        gadget: "nothing"
    },
    {
        id: "recruit5",
        name: "recruit5",
        readableName: "Recruit5",
        fullIndex: "1:5",
        gadget: "nothing"
    },
    {
        id: "smoke-sas",
        name: "smoke",
        readableName: "Smoke",
        fullIndex: "2:1",
        gadget: "operatorpvp_smoke_poisongaskill"
    },
    {
        id: "mute-sas",
        name: "mute",
        readableName: "Mute",
        fullIndex: "3:1",
        gadget: "operatorpvp_mute_gadgetjammed"
    },
    {
        id: "sledge-sas",
        name: "sledge",
        readableName: "Sledge",
        fullIndex: "4:1",
        gadget: "operatorpvp_sledge_hammerhole"
    },
    {
        id: "thatcher-sas",
        name: "thatcher",
        readableName: "Thatcher",
        fullIndex: "5:1",
        gadget: "operatorpvp_thatcher_gadgetdestroywithemp"
    },
    {
        id: "castle-fbi-swat",
        name: "castle",
        readableName: "Castle",
        fullIndex: "2:2",
        gadget: "operatorpvp_castle_kevlarbarricadedeployed"
    },
    {
        id: "ash-fbi-swat",
        name: "ash",
        readableName: "Ash",
        fullIndex: "3:2",
        gadget: "operatorpvp_ash_bonfirewallbreached"
    },
    {
        id: "pulse-fbi-swat",
        name: "pulse",
        readableName: "Pulse",
        fullIndex: "4:2",
        gadget: "operatorpvp_pulse_heartbeatspot"
    },
    {
        id: "thermite-fbi-swat",
        name: "thermite",
        readableName: "Thermite",
        fullIndex: "5:2",
        gadget: "operatorpvp_thermite_reinforcementbreached"
    },
    {
        id: "doc-gign",
        name: "doc",
        readableName: "Doc",
        fullIndex: "2:3",
        gadget: "operatorpvp_doc_teammaterevive"
    },
    {
        id: "rook-gign",
        name: "rook",
        readableName: "Rook",
        fullIndex: "3:3",
        gadget: "operatorpvp_rook_armortakenteammate"
    },
    {
        id: "twitch-gign",
        name: "twitch",
        readableName: "Twitch",
        fullIndex: "4:3",
        gadget: "operatorpve_twitch_gadgetdestroybyshockdrone"
    },
    {
        id: "montagne-gign",
        name: "montagne",
        readableName: "Montagne",
        fullIndex: "5:3",
        gadget: "operatorpvp_montagne_shieldblockdamage"
    },
    {
        id: "glaz-spetsnaz",
        name: "glaz",
        readableName: "Glaz",
        fullIndex: "2:4",
        gadget: "operatorpvp_glaz_sniperkill"
    },
    {
        id: "fuze-spetsnaz",
        name: "fuze",
        readableName: "Fuze",
        fullIndex: "3:4",
        gadget: "operatorpvp_fuze_clusterchargekill"
    },
    {
        id: "kapkan-spetsnaz",
        name: "kapkan",
        readableName: "Kapkan",
        fullIndex: "4:4",
        gadget: "operatorpvp_kapkan_boobytrapkill"
    },
    {
        id: "tachanka-spetsnaz",
        name: "tachanka",
        readableName: "Tachanka",
        fullIndex: "5:4",
        gadget: "operatorpvp_tachanka_turretkill"
    },
    {
        id: "blitz-gsg-9",
        name: "blitz",
        readableName: "Blitz",
        fullIndex: "2:5",
        gadget: "operatorpvp_blitz_flashedenemy"
    },
    {
        id: "iq-gsg-9",
        name: "iq",
        readableName: "IQ",
        fullIndex: "3:5",
        gadget: "operatorpvp_iq_gadgetspotbyef"
    },
    {
        id: "jager-gsg-9",
        name: "jager",
        readableName: "Jäger",
        fullIndex: "4:5",
        gadget: "operatorpvp_jager_gadgetdestroybycatcher"
    },
    {
        id: "bandit-gsg-9",
        name: "bandit",
        readableName: "Bandit",
        fullIndex: "5:5",
        gadget: "operatorpvp_bandit_batterykill"
    },
    {
        id: "buck-jtf2",
        name: "buck",
        readableName: "Buck",
        fullIndex: "2:6",
        gadget: "operatorpvp_buck_kill"
    },
    {
        id: "frost-jtf2",
        name: "frost",
        readableName: "Frost",
        fullIndex: "3:6",
        gadget: "operatorpvp_frost_dbno"
    },
    {
        id: "blackbeard-navy-seal",
        name: "blackbeard",
        readableName: "Blackbeard",
        fullIndex: "2:7",
        gadget: "operatorpvp_blackbeard_gunshieldblockdamage"
    },
    {
        id: "valkyrie-navy-seal",
        name: "valkyrie",
        readableName: "Valkyrie",
        fullIndex: "3:7",
        gadget: "operatorpvp_valkyrie_camdeployed"
    },
    {
        id: "capitao-bope",
        name: "capitao",
        readableName: "Capitão",
        fullIndex: "2:8",
        gadget: "operatorpvp_capitao_lethaldartkills"
    },
    {
        id: "caveira-bope",
        name: "caveira",
        readableName: "Caveira",
        fullIndex: "3:8",
        gadget: "operatorpvp_caveira_interrogations"
    },
    {
        id: "hibana-sat",
        name: "hibana",
        readableName: "Hibana",
        fullIndex: "2:9",
        gadget: "operatorpvp_hibana_detonate_projectile"
    },
    {
        id: "echo-sat",
        name: "echo",
        readableName: "Echo",
        fullIndex: "3:9",
        gadget: "operatorpvp_echo_enemy_sonicburst_affected"
    },
    {
        id: "jackal-geo",
        name: "jackal",
        readableName: "Jackal",
        fullIndex: "2:A",
        gadget: "operatorpvp_cazador_assist_kill"
    },
    {
        id: "mira-geo",
        name: "mira",
        readableName: "Mira",
        fullIndex: "3:A",
        gadget: "operatorpvp_black_mirror_gadget_deployed"
    },
    {
        id: "ying-sat",
        name: "ying",
        readableName: "Ying",
        fullIndex: "2:B",
        gadget: "operatorpvp_dazzler_gadget_detonate"
    },
    {
        id: "lesion-sat",
        name: "lesion",
        readableName: "Lesion",
        fullIndex: "3:B",
        gadget: "operatorpvp_caltrop_enemy_affected"
    },
    {
        id: "ela-grom",
        name: "ela",
        readableName: "Ela",
        fullIndex: "2:C",
        gadget: "operatorpvp_concussionmine_detonate"
    },
    {
        id: "zofia-grom",
        name: "zofia",
        readableName: "Zofia",
        fullIndex: "3:C",
        gadget: "operatorpvp_concussiongrenade_detonate"
    },
    {
        id: "vigil-707th-smb",
        name: "vigil",
        readableName: "Vigil",
        fullIndex: "3:D",
        gadget: "operatorpvp_attackerdrone_diminishedrealitymode"
    },
    {
        id: "dokkaebi-707th-smb",
        name: "dokkaebi",
        readableName: "Dokkaebi",
        fullIndex: "2:D",
        gadget: "disaplaceholder"
    },
    {
        id: "Lion-gign",
        name: "lion",
        readableName: "Lion",
        fullIndex: "3:E",
        gadget: "operatorpvp_tagger_tagdevice_spot"
    },
    {
        id: "Finka-spetsnaz",
        name: "finka",
        readableName: "Finka",
        fullIndex: "4:E",
        gadget: "operatorpvp_rush_adrenalinerush"
    }
];

const STATS = [
    "casualpvp_kills",
    "casualpvp_death",
    "casualpvp_matchlost",
    "casualpvp_matchplayed",
    "casualpvp_matchwon",
    "casualpvp_timeplayed",
    "generalpvp_bulletfired",
    "generalpvp_bullethit",
    "generalpvp_headshot",
    "generalpvp_death",
    "generalpvp_killassists",
    "generalpvp_kills",
    "generalpvp_matchlost",
    "generalpvp_matchplayed",
    "generalpvp_matchwon",
    "generalpvp_meleekills",
    "generalpvp_penetrationkills",
    "generalpvp_revive",
    "generalpvp_timeplayed",
    "rankedpvp_kills",
    "rankedpvp_death",
    "rankedpvp_matchlost",
    "rankedpvp_matchplayed",
    "rankedpvp_matchwon",
    "rankedpvp_timeplayed",
    "secureareapvp_bestscore",
    "secureareapvp_matchlost",
    "secureareapvp_matchplayed",
    "secureareapvp_matchwon",
    "secureareapvp_timeplayed",
    "rescuehostagepvp_bestscore",
    "rescuehostagepvp_matchlost",
    "rescuehostagepvp_matchplayed",
    "rescuehostagepvp_matchwon",
    "rescuehostagepvp_timeplayed",
    "plantbombpvp_bestscore",
    "plantbombpvp_matchlost",
    "plantbombpvp_matchplayed",
    "plantbombpvp_matchwon",
    "plantbombpvp_timeplayed",
    "weapontypepvp_headshot",
    "weapontypepvp_bulletfired",
    "weapontypepvp_bullethit",
    "weapontypepvp_kills",
    "operatorpvp_kills",
    "operatorpvp_death",
    "operatorpvp_roundwon",
    "operatorpvp_roundlost",
    "operatorpvp_timeplayed",

    "generalpvp_blindkills",
    "generalpvp_dbno",
    "generalpvp_dbnoassists",
    "generalpvp_gadgetdestroy",
    "generalpvp_hostagedefense",
    "generalpvp_hostagerescue",
    "generalpvp_rappelbreach",
    "generalpvp_revivedenied",
    "generalpvp_serveraggression",
    "generalpvp_serverdefender",
    "generalpvp_servershacked",
    "generalpvp_suicide"
];

module.exports = {
    URLS,
    WEAPONTYPES,
    OPERATORS,
    STATS
};
