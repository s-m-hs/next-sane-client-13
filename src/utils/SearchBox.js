import { Plus } from '@phosphor-icons/react';
import React, { useContext, useEffect, useState } from 'react';
import { CloseButton } from 'react-bootstrap';
export default function SearchBox(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [productId, setProductId] = useState(0)
    // let { resetSearchbox } = useContext(CmsSistemAssembly);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowOptions(true);
        setActiveIndex(-1); // Reset active index when search term changes
        // اگر کاربر مقدار SearchBox را کامل پاک کرد
        if (e.target.value.trim() === '') {
            props.setHWList(prev =>
                prev.filter(
                    item => item.parentHardWare !== props.parentEnum
                )
            );

            // شناسه محصول انتخاب شده هم پاک شود
            setProductId(0);
        }
    };
    const handleOptionClick = (item) => {
        setShowOptions(false);
        setActiveIndex(-1);

        if (props.id === 'product') {
            // نام محصول انتخاب شده در SearchBox باقی بماند
            setSearchTerm(item.name);

            // ذخیره ID محصول
            setProductId(item.id);

            if (props.parentId) {
                props.setHWList(prev => {
                    // حذف آیتم قبلی مربوط به همین نوع سخت‌افزار
                    // و اضافه کردن آیتم جدید
                    return [
                        ...prev.filter(
                            x => x.parentHardWare !== props.parentEnum
                        ),
                        {
                            parentHardWare: props.parentEnum,
                            cyProductId: item.id,
                            name: item.name
                        }
                    ];
                });
            }
        }
    };
    // const handleOptionClick = (item) => {
    //     setShowOptions(false);
    //     setActiveIndex(-1);
    //     if (props.id === 'product') {
    //         setSearchTerm(item.name);
    //         setProductId(item.id)
    //     }
    // };
    const handleBlur = () => {
        if (!searchTerm) {
            // props.onClear(); // گزارش خالی بودن مشخصات به والد
        }
        setTimeout(() => setShowOptions(false), 100);
    };

    const filteredCategoryItems = props.array?.filter((item) =>
        props.id === 'product' ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : ''
    );


    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            // Move down in the list
            if (showOptions)
                setActiveIndex(prevIndex => (prevIndex < filteredCategoryItems.length - 1 ? prevIndex + 1 : prevIndex));
        } else if (e.key === 'ArrowUp') {
            // Move up in the list
            setActiveIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            // Select the active item
            handleOptionClick(filteredCategoryItems[activeIndex]);
            e.preventDefault();
        }
    };
    useEffect(() => {
        if (showOptions) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showOptions, activeIndex, filteredCategoryItems]);
    useEffect(() => {

        setSearchTerm('');
    }, [props.reset]);

    useEffect(() => {
        if (props.activeLi != props.parentId) setShowOptions(false)
    }, [props.activeLi])
    return (
        <div className="dropdown-containerB">
            <input
                type="text"
                placeholder={props.placeholder}
                value={searchTerm}
                onChange={handleSearchChange}
                // onFocus={() => setShowOptions(true)}
                // onBlur={() => setTimeout(() => setShowOptions(false), 100)}
                onFocus={() => setShowOptions(true)}
                onBlur={handleBlur}
            />
            {/* <button
                className="btn btn-info m-1"
                onClick={() => {
                    if (!props.parentId) {
                        return;
                    }

                    props.setHWList(prev => {

                        const exists = prev.some(
                            item => item.cyProductId === productId
                        );

                        if (exists) {
                            return prev;
                        }

                        return [
                            ...prev,
                            {
                                parentHardWare: props.parentEnum,
                                cyProductId: productId,
                                name: searchTerm
                            }
                        ];
                    });
                }}
            >
                <Plus size={15} />
            </button> */}
            {/* <input
            className='sistemAssembly-input2'
                type="text"
                placeholder={searchTermPrice}
                value={searchTermPrice}
                onChange={handleManualPriceChange} // مدیریت تغییر دستی قیمت
            /> */}
            {showOptions && (
                <div className="dropdown-optionsB"
                    style={{ overflow: "scroll", height: "600px", backgroundColor: "#fff" }}>

                    <span onClick={() => {
                        setShowOptions(false)
                    }}>  <CloseButton style={{ fontSize: "10px" }} /></span>
                    <hr />
                    {filteredCategoryItems?.length > 0 ? (
                        filteredCategoryItems?.map((item, index) => (
                            <div
                                style={{ borderBottom: "1px dotted" }}
                                key={item.id}
                                className={`dropdown-optionB ${index === activeIndex ? 'active' : ''}`}
                                onMouseDown={() => {
                                    handleOptionClick(item);
                                }}
                            >
                                {props.id === 'product' ? `${item.name}` : ''}
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-optionB">موردی پیدا نشد...</div>
                    )}
                </div>
            )}
        </div>
    );
}
