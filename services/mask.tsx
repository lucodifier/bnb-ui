export const maskDoc = (v) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/[A-Za-z]/, '');
  
    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    } else {
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
      v = v.replace(/[A-Za-z]/, '');

    }
    return v;
  }

export const maskAg = (v) => {
    
    v = v.replace(/\D/g, '').slice(0,4)
    v = v.replace(/[A-Za-z]/, '');
    return v
  }

  export const cleanMask = (v) => {
    
    v = v.replace(/\D/g, '')
    v = v.replace(/[A-Za-z]/, '');
    return v
  }

export const maskAcc = (v) => {
    v = v.replace(/\D/g, '');
    v = v.replace(/[a-z]/gm, '');
    if (v.length <= 6) {
      v = v.replace(/(\d{4})(\d{1})$/, "$1-$2");
    }
    if (v.length <= 7) {
      v = v.replace(/(\d{5})(\d{1})$/, "$1-$2");
    }
    if (v.length <= 8) {
      v = v.replace(/(\d{6})(\d{1})$/, "$1-$2");
    }
    if (v.length <= 9) {
      v = v.replace(/(\d{7})(\d{1})$/, "$1-$2");
    }
    if (v.length <= 10) {
      v = v.replace(/(\d{8})(\d{1})$/, "$1-$2");
    }
    return v
  }

// export const maskValor = (v) => {
//   v = v.replace(/\D/g,'');
//   v = (v/100).toFixed(2);
// 	v = v.replace(".", ",");
// 	v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
// 	v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
  
//   return v;

// }   

export const maskValor = (v) => {
  v = v.replace(/\D/g, "");
  v = (v/100).toFixed(2);
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{2})$/, "$1,$2")
  v = v.replace(/(?=(\d{3})+(\D))\B/g, ".")

  return v;
}

export function maskPartialCpfCnpj(value : string) {
  if(value){
    if(value.length < 11){
      value = value.padStart(11, "0");
    }

    if(value.length > 11 && value.length < 14){
      value = value.padStart(14, "0");
    }

    if(value.length === 11 ) {
      value = value.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "***.$2.$3-**")
      return value
    }
    if(value.length === 14){
      value = value.replace(/(\d{2})?(\d{3})?(\d{3})?(\d{4})?(\d{2})/, "**.$2.$3/$4.**")
      return value
    }
  }
}