
export default class AppUtils
{
    static sectionIdToTitle = (sectionId) =>
    {
        switch (parseInt(sectionId))
        {
            case 1 :
                return 'القسم الرجالي';
            case 2 :
                return 'القسم النسوي / الهيئة الادارية';
            case 3 :
                return 'القسم النسوي / الهيئة العلمية';
            case 4 :
                return 'المرحلة التمهيدية / الفقه';
            case 5 :
                return 'المرحلة التمهيدية / العقائد';
            case 6 :
                return 'المرحلة التمهيدية / النحو';
            case 7 :
                return 'المرحلة التمهيدية / المنطق';
            case 8 :
                return 'المرحلة التمهيدية / احكام التجويد';
            case 9 :
                return 'مقدمات اولى / الفقه';
            case 10 :
                return 'مقدمات اولى / العقائد';
            case 11 :
                return 'مقدمات اولى / النحو';
            case 12 :
                return 'مقدمات اولى / المنطق';
            case 13 :
                return 'مقدمات ثانية / الفقه';
            case 14 :
                return 'مقدمات ثانية / العقائد';
            case 15 :
                return 'مقدمات ثانية / النحو';
            case 16 :
                return 'مقدمات ثانية / المنطق';
            default :
                return "المنتدى غير معروف";
        }
    }
}