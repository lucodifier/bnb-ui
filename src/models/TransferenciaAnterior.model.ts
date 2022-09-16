export interface TransferenciaAnteriorModel {
    cd_bco_dst: number;
    cd_ag_dst: number;
    cd_cta_dst: string;
    dv_cta_dst: number;
    tp_cta_dst: string;
    nr_cpf_pri_dst: string;
    nm_pri_ttl_dst: string;
    data: string;
    cd_it: number;
    cd_ispb: string;
    nm_bco_dst: string;
    ch_en_rcb: string;
}

export const initialFormTransferenciaAnterior: TransferenciaAnteriorModel = {
    cd_bco_dst: 0,
    cd_ag_dst: 0,
    cd_cta_dst: '',
    dv_cta_dst: 0,
    tp_cta_dst: '',
    nr_cpf_pri_dst: '',
    nm_pri_ttl_dst: '',
    data: '',
    cd_it: 0,
    cd_ispb: '',
    nm_bco_dst: '',
    ch_en_rcb: ''
}