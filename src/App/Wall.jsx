import React, { useEffect } from 'react';
import { useGroupoposts } from './hooks/groupoposts';
import { Groupoposts } from './Groupoposts/Groupoposts';

//Composant Wall, permet l'affichge des 'Groupoposts'
export function Wall() {

  const {
    groupoposts,
    fetchGroupoposts,
    fetchGroupopost,
  } = useGroupoposts()
  
  let content = null
   {content = <Groupoposts groupoposts={groupoposts} onClick={fetchGroupopost} />}  

  useEffect(function () {
   {fetchGroupoposts()}
  }, [fetchGroupoposts])


  return <>    
    <div className="container">      
      {content}
    </div>
  </>
}