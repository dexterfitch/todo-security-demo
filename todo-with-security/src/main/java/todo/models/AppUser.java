package todo.models;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public class AppUser extends User {

    Set<String> roles;
    Integer userId;

    public AppUser(Integer userId, String username, String password, Set<String> roles) {
        super(
            username,
            password,
            roles.stream().map( roleName -> new SimpleGrantedAuthority( "ROLE_" + roleName ) ).collect( Collectors.toList() ) );
        this.userId = userId;
        this.roles = roles;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        AppUser appUser = (AppUser) o;
        return Objects.equals(roles, appUser.roles) && Objects.equals(userId, appUser.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), roles, userId);
    }
}
