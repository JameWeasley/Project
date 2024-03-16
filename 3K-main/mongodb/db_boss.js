import mongoose from 'mongoose'
var boss_data = mongoose.Schema({
    code: {
        type: String
    },
    name: {
        type: String
    },
    level: {
        type: String
    },
    wid: {
        type: String
    },
    size: {
        type: String
    },
    class: {
        type: String
    },
    exp: {
        type: String
    },
    hp: {
        type: String
    },
    mp: {
        type: String
    },
    attr_str: {
        type: String
    },
    attr_int: {
        type: String
    },
    attr_mind: {
        type: String
    },
    attr_con: {
        type: String
    },
    attr_dex: {
        type: String
    },
    attr_leader: {
        type: String
    },
    walk_speed: {
        type: String
    },
    run_speed: {
        type: String
    },
    attack_speed: {
        type: String
    },
    attack_delay: {
        type: String
    },
    cast_attack_delay: {
        type: String
    },
    attack_range: {
        type: String
    },
    attack_effect_range: {
        type: String
    },
    damage: {
        type: String
    },
    defense: {
        type: String
    },
    magic_attack_type: {
        type: [String]
    },
    ai: {
        type: String
    },
    ai_reborn_range: {
        type: String
    },
    ai_reborn_delay: {
        type: String
    },
    ai_guard_range: {
        type: String
    },
    gold: {
        type: String
    },
    drop: {
        type: [String]
    },
    sfx_move: {
        type: String
    },
    sfx_attack: {
        type: String
    },
    sfx_hit: {
        type: String
    },
    sfx_hurt: {
        type: String
    },
    sfx_dead: {
        type: String
    },
    country: {
        type: String
    },
    skill_exp: {
        type: String
    },
    attr_level: {
        type: String
    },
    ratio_hit: {
        type: String
    },
    height: {
        type: String
    },
    type: {
        type: [String]
    },
    limit_job: {
        type: [String]
    },
    drop_mission: {
        type: String
    },
    magic_defense_type: {
        type: [String]
    },
    ai_call_range: {
        type: String
    },
    ratio_miss: {
        type: String
    },
    ratio_attack_x2: {
        type: String
    },
    function: {
        type: String
    },
    set_color: {
        type: String
    },
    sex: {
        type: String
    },
    dead_horse: {
        type: String
    },
    zoom: {
        type: String
    },
    special_attack: {
        type: String
    },
    magic_power: {
        type: String
    },
    anti_status: {
        type: String
    },
    appear_time: {
        type: String
    },
    spc_flag: {
        type: String
    },
    call_sol1: {
        type: String
    },
    call_sol2: {
        type: String
    },
    call_sol3: {
        type: String
    },
    call_sol_total: {
        type: String
    },
    appear_ratio: {
        type: String
    },
    no_back_off: {
        type: String
    },
    ai_help_self_ratio: {
        type: String
    },
    ai_help_self_magic: {
        type: String
    },
    ai_help_self_level: {
        type: String
    },
    equip_weapon: {
        type: String
    },
    equip_horse: {
        type: String
    },
    bp: {
        type: String
    },
    office: {
        type: String
    },
    call_sol4: {
        type: String
    },
    armor_bless: {
        type: String
    },
    ai_fast_run_ratio: {
        type: String
    },
    ai_fast_run_magic: {
        type: String
    },
    ai_fast_run_level: {
        type: String
    },
    call_ratio: {
        type: String
    },
    boss_teleport: {
        type: String
    },
    boss_cast_all: {
        type: String
    },
    hp_low_ratio_attack: {
        type: String
    },
    attack_spec_ratio: {
        type: String
    },
    cnpc_flag: {
        type: String
    },
    equip_shield: {
        type: String
    },
    drop_special: {
        type: String
    },
    ks_rscore: {
        type: String
    },
    talk_no_dir: {
        type: String
    },
    Damage_OnlyJob: {
        type: String
    },
    boss_call_all: {
        type: String
    },
    use_leader: {
        type: String
    },
    cnpc_cell: {
        type: String
    },
    call_sol5: {
        type: String
    },
    boss_soul_item: {
        type: String
    },
    no_noattack: {
        type: String
    },
    NAI_skill_continuous: {
        type: String
    },
    NAI_skill_select: {
        type: String
    },
    boss_soul_role: {
        type: String
    },
    image: {
        type: String
    },
    maps: {
        type: [String]
    }
}, {
    collection: "boss",
    versionKey: false
});

var noname = mongoose.models.boss || mongoose.model("boss", boss_data);
module.exports = noname;