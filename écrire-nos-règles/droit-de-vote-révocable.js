/*

L'objectif ici est de créer n (>= 3) objets. Chaque objet contient notamment le droit de voter pour révoquer le droit d'une personne 

*/

export default function makeDroitDeDécisionRévocable(){

}


export function test(){
    const droits = makeDroitDeDécisionRévocable(['a', 'b', 'c', 'd']);
    /*
        droits: {
            a: {
                others: {
                    b: {revoke, unrevoke},
                    c: {revoke, unrevoke},
                    d: {revoke, unrevoke}
                }
            }
        }
    */

    // d is about to be revoked

    const {others: othersThanD} = droits['d']
    // d tries to defend themself against all the others
    for(const other of ['a', 'b', 'c']){ othersThanD[other].revoke() }

    // a revokes d
    const {others: othersThanA} = droits['a']
    othersThanA['d'].revoke()

    // d tries to defend themself
    for(const other of ['a', 'b', 'c']){ othersThanD[other].revoke() }

    const {others: othersThanB} = droits['b']
    othersThanB['d'].revoke()

    // d tries to defend themself
    for(const other of ['a', 'b', 'c']){ othersThanD[other].revoke() }

    const {others: othersThanC} = droits['c']
    othersThanC['d'].revoke()

    // revocation becomes effective

    // d tries to defend themself
    for(const other of ['a', 'b', 'c']){ othersThanD[other].revoke() } // this should throw
}