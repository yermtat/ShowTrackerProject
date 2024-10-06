using AuthData.DTO;
using AuthData.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthData.Configs;

internal class MappingConfiguration
{
    public static Mapper InitializeConfig()
    {
        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<User, RegisterDTO>()
                .ForMember(
                    dest => dest.Username,
                    x => x.MapFrom(u => u.Username));


            cfg.CreateMap<User, RegisterDTO>()
                .ForMember(
                    dest => dest.Email,
                    x => x.MapFrom(u => u.Email));

        });


        var mapper = new Mapper(mapperConfig);
        return mapper;
    }
}
