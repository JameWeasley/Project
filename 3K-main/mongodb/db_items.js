import mongoose from 'mongoose'
var items_data = mongoose.Schema({
    code: {
        type: String
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    wait_type: {
        type: String
    },
    light: {
        type: String
    },
    attack_range: {
        type: String
    },
    effect_range: {
        type: String
    },
    add_attack_power: {
        type: String
    },
    attack_speed: {
        type: String
    },
    add_weapon_hit: {
        type: String
    },
    eq_magic_attack_type: {
        type: [String]
    },
    limit_level: {
        type: String
    },
    limit_job: {
        type: String
    },
    cost: {
        type: String
    },
    sell: {
        type: String
    },
    cost_level: {
        type: String
    },
    icon: {
        type: String
    },
    help_string: {
        type: String
    },
    super_type: {
        type: String
    },
    sfx_hit: {
        type: String
    },
    sfx_attack: {
        type: String
    },
    comp_times: {
        type: String
    },
    add_attr_mind: {
        type: String
    },
    add_magic_power: {
        type: String
    },
    add_attr_con: {
        type: String
    },
    add_attackx2_ratio: {
        type: String
    },
    add_attr_int: {
        type: String
    },
    add_attr_str: {
        type: String
    },
    wid: {
        type: String
    },
    add_attr_dex: {
        type: String
    },
    add_hp: {
        type: String
    },
    sp_effect: {
        type: String
    },
    add_mp: {
        type: String
    },
    gem_number: {
        type: String
    },
    soul_times: {
        type: String
    },
    add_attr_leader: {
        type: String
    },
    function: {
        type: String
    },
    limit_sex: {
        type: String
    },
    new_exp: {
        type: String
    },
    new_explevel: {
        type: String
    },
    wawa_only: {
        type: String
    },
    weaponType: {
        type: String
    },
    weight: {
        type: String
    },
    use_magic_time: {
        type: String
    },
    use_duedate: {
        type: String
    },
    type2: {
        type: String
    },
    add_defense: {
        type: String
    },
    eq_skill_attack_type: {
        type: String
    },
    kill: {
        type: String
    },
    recommand_soldier: {
        type: String
    },
    function2: {
        type: String
    },
    use_magic_id: {
        type: String
    },
    drop_num: {
        type: String
    },
    comp_gem_type: {
        type: String
    },
    move: {
        type: String
    },
    eq_magic_resist: {
        type: [String]
    },
    reduce_super_dmg: {
        type: String
    },
    reduce_gen_magic_dmg: {
        type: String
    },
    duedate_only: {
        type: String
    },
    use_magic_level: {
        type: String
    },
    ccost_level: {
        type: String
    },
    add_weapon_misshit: {
        type: String
    },
    anti_status_ratio: {
        type: String
    },
    add_extra: {
        type: String
    },
    sfx_run: {
        type: String
    },
    sfx_walk: {
        type: String
    },
    horse_height: {
        type: String
    },
    no_attack: {
        type: String
    },
    other_wid: {
        type: String
    },
    letto_item: {
        type: String
    },
    cd_group_war: {
        type: String
    },
    cd_tick_war: {
        type: String
    },
    tp_map_code: {
        type: String
    },
    tp_pos: {
        type: String
    },
    add_st: {
        type: String
    },
    cd_group: {
        type: String
    },
    cd_tick: {
        type: String
    },
    add_loyalty: {
        type: String
    },
    letto_gold: {
        type: String
    },
    engineer_type: {
        type: String
    },
    engineer_skill: {
        type: String
    },
    resurrect_soldier: {
        type: String
    },
    resurrect: {
        type: String
    },
    is_use_broadcast: {
        type: String
    },
    use_delay: {
        type: String
    },
    use_confirm: {
        type: String
    },
    duedateO_only: {
        type: String
    },
    type3: {
        type: String
    },
    limit_rebirth: {
        type: String
    },
    material_type: {
        type: String
    },
    limit_leader: {
        type: String
    },
    image: {
        type: String
    },
}, {
    collection: "items",
    versionKey: false
});

var noname = mongoose.models.items || mongoose.model("items", items_data);
module.exports = noname;