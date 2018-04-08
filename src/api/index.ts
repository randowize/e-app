import './'
import {Park} from './model';
export async function addRecord(record) {
    const park = new Park(record);
    const rst = await park.save();
    return rst;
}

export async function updateRecord(record) {

    const rst = await  (Park as any)
    .findOneAndUpdate({_id: record.id}, record, {new: true})
    .exec();
    console.log(rst);
    return rst;
}
export async function getAllParks () {
    return Park.find();
}