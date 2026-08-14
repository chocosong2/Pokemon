import React, { useEffect } from 'react'

const DamageRelations = ({damages}) => {

  useEffect(()=>{
    const arrayDamage = damages.map((damage)=>
    separateObjectBetweenToAndFrom(damage))
  },[])

  const separateObjectBetweenToAndFrom = (damage) =>{
    const from = filterDamageRelations('_from', damage);
    const to = filterDamageRelations('_to', damage);
    return {from, to};
  }
  const filterDamageRelations = (valueFilter, damage) => {
    const result = Object.entries(damage)
    .filter(([keyName,value])=>{

      return keyName.includes(valueFilter);
    }).reduce((acc, [keyName, value])=>{
      const keyWithValueFilterRemove = keyName.replace(
        valueFilter, ''
      )
      console.log(acc,[keyName,value])
      return (acc = {[keyWithValueFilterRemove]:value, ...acc})
    },{})
    return result;
  }


  return (
    <div>
      dd
    </div>
  )
}

export default DamageRelations
